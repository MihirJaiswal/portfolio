"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useGrayscaleStore } from "@/lib/store"

export default function WaterRippleEffect() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const timeRef = useRef(0)
  const isHoveredRef = useRef(false)
  const { isGrayscaleEnabled } = useGrayscaleStore()

  useEffect(() => {
    // Capture the current mount element at the start of the effect
    const mountElement = mountRef.current
    if (!mountElement) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(920, 955)
    renderer.setClearColor(0x000000, 0)
    mountElement.appendChild(renderer.domElement)

    // Load texture
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(
      "/assets/art.jpg",
    )

    // Improved water ripple shader with grayscale
    const vertexShader = `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D texture1;
      uniform float time;
      uniform vec2 mouse;
      uniform float hoverIntensity;
      uniform float grayscaleAmount;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        
        // Global wavy distortion that affects the entire image
        float wave1 = sin(uv.x * 10.0 + time * 2.0) * 0.006;
        float wave2 = sin(uv.y * 8.0 + time * 1.5) * 0.005;
        float wave3 = sin((uv.x + uv.y) * 12.0 + time * 2.5) * 0.0015;
        
        // Mouse-based ripples that spread across the image
        float dist = distance(uv, mouse);
        float mouseWave1 = sin(dist * 20.0 - time * 4.0) * exp(-dist * 3.0) * hoverIntensity * 0.012;
        float mouseWave2 = sin(dist * 15.0 - time * 3.0) * exp(-dist * 2.0) * hoverIntensity * 0.008;
        
        // Additional ripples from mouse position that create expanding circles
        float ripple1 = sin(length(uv - mouse) * 25.0 - time * 5.0) * exp(-length(uv - mouse) * 4.0) * hoverIntensity * 0.015;
        float ripple2 = sin(length(uv - mouse) * 18.0 - time * 3.5) * exp(-length(uv - mouse) * 3.0) * hoverIntensity * 0.010;
        
        // Combine all waves
        float totalWave = wave1 + wave2 + wave3 + mouseWave1 + mouseWave2 + ripple1 + ripple2;
        
        // Create smooth directional distortion
        vec2 distortion = vec2(
          sin(uv.x * 8.0 + time * 1.8) * 0.002 + sin(uv.y * 6.0 + time * 2.2) * 0.0015,
          sin(uv.y * 7.0 + time * 1.6) * 0.002 + sin(uv.x * 9.0 + time * 2.0) * 0.0015
        );
        
        // Add mouse-based radial distortion
        vec2 mouseDir = uv - mouse;
        float mouseDist = length(mouseDir);
        vec2 mouseDistortion = normalize(mouseDir) * sin(mouseDist * 20.0 - time * 4.0) * 
                              exp(-mouseDist * 3.0) * hoverIntensity * 0.008;
        
        // Combine distortions
        vec2 finalDistortion = distortion + mouseDistortion + vec2(totalWave * 0.3, totalWave * 0.4);
        
        // Apply distortion to UV coordinates
        vec2 distortedUv = uv + finalDistortion;
        
        // Sample texture with distorted coordinates
        vec4 color = texture2D(texture1, distortedUv);
        
        // Apply grayscale effect
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        vec3 grayscaleColor = vec3(gray);
        
        // Mix between original color and grayscale based on both global setting and hover state
        float baseGrayscale = ${isGrayscaleEnabled ? '1.0' : '0.0'};
        float finalGrayscaleAmount = baseGrayscale * grayscaleAmount;
        color.rgb = mix(color.rgb, grayscaleColor, finalGrayscaleAmount);
        
        gl_FragColor = color;
      }
    `

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        texture1: { value: texture },
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
        hoverIntensity: { value: 0.3 },
        grayscaleAmount: { value: 1.0 }, // Start with full grayscale
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    })

    // Create geometry
    const geometry = new THREE.PlaneGeometry(4, 3, 1, 1)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    camera.position.z = 3

    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer
    materialRef.current = material

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1 - (event.clientY - rect.top) / rect.height
      mouseRef.current = { x, y }
    }

    // Mouse enter/leave handlers
    const handleMouseEnter = () => {
      isHoveredRef.current = true
    }
    const handleMouseLeave = () => {
      isHoveredRef.current = false
    }

    renderer.domElement.addEventListener("mousemove", handleMouseMove)
    renderer.domElement.addEventListener("mouseenter", handleMouseEnter)
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave)

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016

      if (materialRef.current) {
        materialRef.current.uniforms.time.value = timeRef.current
        materialRef.current.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y)

        // Smooth hover transition for ripple intensity
        const targetIntensity = isHoveredRef.current ? 1.2 : 0.3
        const currentIntensity = materialRef.current.uniforms.hoverIntensity.value
        materialRef.current.uniforms.hoverIntensity.value += (targetIntensity - currentIntensity) * 0.05

        // Smooth grayscale transition - colorful on hover, grayscale when not hovering
        const targetGrayscale = isHoveredRef.current ? 0.0 : 1.0 // 0 = full color, 1 = full grayscale
        const currentGrayscale = materialRef.current.uniforms.grayscaleAmount.value
        materialRef.current.uniforms.grayscaleAmount.value += (targetGrayscale - currentGrayscale) * 0.08
      }

      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera)
      }
      requestAnimationFrame(animate)
    }
    animate()

    // Cleanup function now uses the captured mountElement
    return () => {
      renderer.domElement.removeEventListener("mousemove", handleMouseMove)
      renderer.domElement.removeEventListener("mouseenter", handleMouseEnter)
      renderer.domElement.removeEventListener("mouseleave", handleMouseLeave)

      // Use the captured mountElement instead of mountRef.current
      if (mountElement && renderer.domElement && mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [isGrayscaleEnabled])

  return (
    <div className="w-full flex lg:block justify-center items-start -mt-[300px] md:-mt-[165px] lg:-ml-[153px] max-h-[640px]">
      <div className="relative">
         <div
          ref={mountRef}
          className="transition-transform duration-300 scale-50 md:scale-100"
        /> 
      </div>
    </div>
  )
}
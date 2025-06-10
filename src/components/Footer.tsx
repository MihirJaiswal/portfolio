import React from 'react'
import { siteConfig } from "@/lib/data"
import { TextHoverEffect } from './ui/text-hover-effect'

function Footer() {
    return (
        <div className='relative z-50 overflow-hidden border-t'>
            <footer className="bg-black text-white pt-20 ">
                <div className="container mx-auto px-6 flex flex-col justify-center border-b border-dashed border-neutral-700 pb-12">
                    <h2 className="text-5xl md:text-[7rem] font-bold mb-12 text-center">
                        LET&apos;S <span className="text-neutral-400">TALK</span>
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { href: siteConfig.social.instagram, label: "INSTAGRAM" },
                            { href: siteConfig.social.github, label: "GITHUB" },
                            { href: siteConfig.social.linkedin, label: "LINKEDIN" },
                            { href: `mailto:${siteConfig.email}`, label: "CONTACT ME" }
                        ].map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target={link.href.startsWith('mailto:') ? undefined : "_blank"}
                                rel={link.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                                className="bg-black text-white px-8 py-3 rounded-full text-xs tracking-wider hover:bg-white hover:text-black border border-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <p className="text-xs text-center mt-20 text-neutral-400">
                        &copy; {new Date().getFullYear()} {siteConfig.author}. ALL RIGHTS RESERVED.
                    </p>
                </div>
                <div className=' border-t border-dashed border-neutral-700 mt-1 bg-[#000000] bg-[radial-gradient(#171717_1px,#000000_1px)] bg-[size:20px_20px]'>
                    
                    <div className="h-[20rem] lg:h-[10rem] hidden md:flex items-center justify-center max-w-7xl mx-auto mt-12 relative">
                        
                        <TextHoverEffect text={siteConfig.authorTagline.toUpperCase()} />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
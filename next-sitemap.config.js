const fs = require("fs");
const path = require("path");

module.exports = {
    siteUrl: "https://mihirjaiswal.me", 
    generateRobotsTxt: true,
    sitemapSize: 7000,
    
    // FIXED: Set to false to avoid sitemap index issues
    generateIndexSitemap: false,
    
    // Clean exclusions
    exclude: [
        '/api/*', 
        '/admin/*', 
        '/_*',
        // IMPORTANT: Exclude static files that were causing issues
        '/icon.png',
        '/robots.txt',
        '/*.png',
        '/*.ico',
        '/*.txt'
    ],
    
    // Simplified transform function
    transform: async (config, path) => {
        // Handle the path parameter correctly
        const pathString = typeof path === 'string' ? path : path.loc || path.route || path;
        
        let priority = 0.7;
        let changefreq = "weekly";

        if (pathString === "/") {
            priority = 1.0;
            changefreq = "daily";
        } else if (pathString === "/projects" || pathString === "/blogs") {
            priority = 0.8;
            changefreq = "weekly";
        } else if (pathString.startsWith("/projects/")) {
            priority = 0.7;
            changefreq = "weekly";
        } else if (pathString.startsWith("/blogs/")) {
            priority = 0.7;
            changefreq = "weekly";
        }

        return {
            loc: pathString,
            changefreq,
            priority,
            lastmod: new Date().toISOString(),
        };
    },
    
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/" },
            { userAgent: "*", disallow: ["/api/*", "/admin/*"] },
        ],
        additionalSitemaps: [
            "https://mihirjaiswal.me/sitemap.xml"
        ]
    },
    
    additionalPaths: async (config) => {
        const projectRoot = process.cwd();

        const listContentSlugs = (dirPath) => {
            try {
                const fullPath = path.join(projectRoot, dirPath);
                
                if (!fs.existsSync(fullPath)) {
                    console.log(`Directory does not exist: ${fullPath}`);
                    return [];
                }
                
                const files = fs.readdirSync(fullPath);
                const slugs = files
                    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
                    .map((f) => f.replace(/\.(mdx|md)$/, ""));
                
                return slugs;
            } catch (error) {
                console.error(`Error reading directory ${dirPath}:`, error.message);
                return [];
            }
        };

        // Your project slugs
        const projectSlugs = [
            "nyx-ui",
            "digi-bazaar", 
            "storyweaver-ai",
            "monster-pedia",
            "hero-hq",
            "ink-scroll",
            "windows-95-portfolio",
            "ghibli-verse",
            "cybersphere",
            "certificate-generator",
            "gdsc-cdgi-website",
            "toy-sandook",
            "citronics-website",
            "dream-mist"
        ];
        
        // Get blog slugs from your content directory
        const blogSlugs = [
            "nextjs-image-optimization",
            "nyx-ui",
            "ui-best-practices"
        ];

        // Generate all paths
        const staticRoutes = [
            { loc: "/" },
            { loc: "/projects" }, 
            { loc: "/blogs" }
        ];

        const projectRoutes = projectSlugs.map((slug) => ({ 
            loc: `/projects/${slug}` 
        }));
        
        const blogRoutes = blogSlugs.map((slug) => ({ 
            loc: `/blogs/${slug}` 
        }));

        // Combine all routes
        const allRoutes = [...staticRoutes, ...projectRoutes, ...blogRoutes];
        
        console.log(`Generated ${allRoutes.length} routes for sitemap`);
        
        return allRoutes;
    },
};

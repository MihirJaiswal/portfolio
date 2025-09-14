const fs = require("fs");
const path = require("path");

module.exports = {
    siteUrl: "https://mihirjaiswal-portfolio.vercel.app/", 
    generateRobotsTxt: true,
    sitemapSize: 7000,
    generateIndexSitemap: true,
    exclude: ['/api/*', '/admin/*', '/_*'],
    
    // Fixed transform function - receives (config, path) parameters
    transform: async (config, pathObj) => {
        // Handle both string and object formats
        const pathString = typeof pathObj === 'string' ? pathObj : pathObj.loc;
        
        console.log("🔄 Transform called for path:", pathString);
        
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
            changefreq = "monthly";
        } else if (pathString.startsWith("/blogs/")) {
            priority = 0.7;
            changefreq = "weekly";
        }

        const result = {
            loc: pathString,
            changefreq,
            priority,
            lastmod: new Date().toISOString(),
        };
        
        console.log("✅ Transform result for", pathString, ":", result);
        return result;
    },
    
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/" },
            { userAgent: "*", disallow: ["/api/*", "/admin/*"] },
        ],
    },
    
    additionalPaths: async (config) => {
        console.log("🚀 additionalPaths function called");
        console.log("📝 Config received:", config);
        
        const projectRoot = process.cwd();
        console.log("📁 Project root:", projectRoot);

        const listContentSlugs = (dirPath) => {
            try {
                const fullPath = path.join(projectRoot, dirPath);
                console.log(`🔍 Checking directory: ${fullPath}`);
                
                if (!fs.existsSync(fullPath)) {
                    console.log(`❌ Directory does not exist: ${fullPath}`);
                    return [];
                }
                
                console.log(`✅ Directory exists: ${fullPath}`);
                const files = fs.readdirSync(fullPath);
                console.log(`📂 Files found in ${dirPath}:`, files);
                
                const slugs = files
                    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
                    .map((f) => f.replace(/\.(mdx|md)$/, ""));
                
                console.log(`🏷️ Slugs extracted from ${dirPath}:`, slugs);
                return slugs;
            } catch (error) {
                console.error(`💥 Error reading directory ${dirPath}:`, error.message);
                return [];
            }
        };

        // Project slugs from your projects data
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
        
        console.log("📋 Project slugs from data:", projectSlugs);
        
        const blogSlugs = listContentSlugs("src/content/blog");
        console.log("📖 Blog slugs from content:", blogSlugs);

        const staticRoutes = [
            "/",
            "/projects", 
            "/blogs"
        ];
        console.log("🏠 Static routes:", staticRoutes);

        // Fixed route generation to match your file structure (/projects/[id])
        const projectRoutes = projectSlugs.map((slug) => `/projects/${slug}`);
        console.log("🔗 Generated project routes:", projectRoutes);
        
        const blogRoutes = blogSlugs.map((slug) => `/blogs/${slug}`);
        console.log("📝 Generated blog routes:", blogRoutes);

        const dynamicRoutes = [...projectRoutes, ...blogRoutes];
        console.log("⚡ All dynamic routes:", dynamicRoutes);

        const allRoutes = [...staticRoutes, ...dynamicRoutes];
        console.log("🌐 All routes combined:", allRoutes);
        console.log("📊 Total route count:", allRoutes.length);

        const finalResult = allRoutes.map((loc) => {
            const entry = {
                loc,
                changefreq: loc === "/" ? "daily" : 
                           loc === "/projects" || loc === "/blogs" ? "weekly" :
                           loc.startsWith("/blogs/") || loc.startsWith("/projects/") ? "weekly" : "monthly",
                priority: loc === "/" ? 1.0 : 
                         loc === "/projects" || loc === "/blogs" ? 0.8 :
                         loc.startsWith("/blogs/") || loc.startsWith("/projects/") ? 0.7 : 0.6,
                lastmod: new Date().toISOString(),
            };
            
            console.log(`📄 Created sitemap entry for ${loc}:`, entry);
            return entry;
        });
        
        console.log("🎯 Final result array:", finalResult);
        console.log("📈 Final result count:", finalResult.length);
        console.log("=== END additionalPaths ===");
        
        return finalResult;
    },
};
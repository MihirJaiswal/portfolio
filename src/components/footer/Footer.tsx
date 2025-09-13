import { siteConfig } from "@/lib/data"

function Footer() {
    return (
        <div className='relative z-50 overflow-hidden border-t py-20'>
            <footer>
                <div className="container mx-auto px-6 flex flex-col justify-center border-y border-dashed py-10">
                    <h2 className="text-5xl sm:text-7xl md:text-[7rem] font-extrabold mb-12 text-center">
                        LET&apos;S <span className="text-neutral-400">TALK</span>
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { href: siteConfig.social.twitter, label: "TWITTER" },
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
            </footer>
        </div>
    )
}

export default Footer
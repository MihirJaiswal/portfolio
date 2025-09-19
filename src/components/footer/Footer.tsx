import { siteConfig } from "@/lib/data"
import Link from "next/link"

function Footer() {
  return (
    <div className="relative z-50 overflow-hidden border-t">
      <footer>
        <div className="container mx-auto flex flex-col justify-center border-y py-10">
          <h2 className="text-5xl sm:text-7xl md:text-[7rem] font-extrabold mb-12 text-center px-6">
            LET&apos;S <span className="text-neutral-400">TALK</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-8 px-6">
            {[
              { href: siteConfig.social.twitter, label: "TWITTER" },
              { href: siteConfig.social.github, label: "GITHUB" },
              { href: siteConfig.social.linkedin, label: "LINKEDIN" },
              { href: `mailto:${siteConfig.email}`, label: "CONTACT ME" },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="bg-black text-white px-8 py-3 rounded-full text-xs tracking-wider hover:bg-white hover:text-black border border-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>


          <div className="border-t pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6">
              <p className="text-xs text-neutral-400 text-center md:text-left">
                &copy; {new Date().getFullYear()} {siteConfig.author}. ALL RIGHTS RESERVED.
              </p>

              <div className="flex gap-6 text-xs text-neutral-400">
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Projects
                </Link>
                <Link href="/blogs" className="hover:text-foreground transition-colors">
                  Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

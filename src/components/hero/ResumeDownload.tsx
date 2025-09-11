'use client'
import { ArrowDown } from "lucide-react"
import { Button } from "../ui/button"

function ResumeDownload() {
    const downloadPDF = () => {
        const link = document.createElement("a")
        link.href = "/mihir-jaiswal-resume.pdf"
        link.download = "/mihir-jaiswal-resume.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return (
        <div>
            <Button
                onClick={downloadPDF}
                className="btn"
                aria-label="Download CV"
                role="button"
            >
                <div className="flex items-center gap-2 justify-center">
                    <span>Download CV</span>
                    <div>
                        <ArrowDown className="w-4 h-4" />
                    </div>
                </div>
            </Button>
        </div>
    )
}

export default ResumeDownload

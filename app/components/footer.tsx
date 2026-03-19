export default function Footer() {
    return (
      <footer>
        <div className="flex justify-center mb-2">
          <div className="h-6 w-36" style={{ backgroundColor: '#DCD6F7' }} />
          <div className="h-6 w-36" style={{ backgroundColor: '#A6B1E1' }} />
          <div className="h-6 w-36" style={{ backgroundColor: '#B4869F' }} />
          <div className="h-6 w-36" style={{ backgroundColor: '#985F6F' }} />
          <div className="h-6 w-36" style={{ backgroundColor: '#4E4C67' }} />
        </div>
        <div className="text-center text-sm text-muted-foreground mt-4 mb-4">
          <p className="font-mono text-[#D2D2D4] leading-relaxed">
            Explore how my site was made {" "}
            <a
              href="https://github.com/clarkpy/portfolio"
              className="underline underline-offset-4 text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors font-mono text-sm"
            >
              here
            </a>
            . Created by{" "}
            <a
              href="https://github.com/clarkpy"
              className="underline underline-offset-4 text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors font-mono text-sm"
            >
              aj
            </a>
          </p>
        </div>
      </footer>
    )
}
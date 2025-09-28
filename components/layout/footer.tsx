export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center text-xs text-gray-500">
            <p>
              by{" "}
              <a
                href="https://valentinradovich.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors duration-200 underline"
              >
                valen radovich
              </a>{" "}
              :)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 
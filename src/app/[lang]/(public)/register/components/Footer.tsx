import { GraduationCap } from 'lucide-react'

export default function Footer() {
  return (
    <footer dir='ltr' className="pt-3 4">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 text-gray-500">
          <GraduationCap
            size={28}
            className="text-[#0B2A6F]"
          />
          <span>
            © {new Date().getFullYear()} Center Education. All rights reserved. 
          </span>

        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-blue-600 font-medium">
          <a
            // href="/privacy-policy"
            className="hover:underline"
          >
            Privacy Policy
          </a>

          <span className="text-gray-400">|</span>

          <a
            // href="/terms-of-use"
            className="hover:underline"
          >
            Terms of Use
          </a>

          <span className="text-gray-400">|</span>

          <a
            // href="/contact-us"
            className="hover:underline"
          >
            Contact Us
          </a>

        </div>
      </div>
    </footer>
  )
}

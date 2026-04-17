import { FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  const navItems = [
    { label: "Нүүр", href: "/" },
    { label: "Холбоо барих", href: "/contact" },
  ];

  const contactInfo = {
    address: "Монгол Улс, Улаанбаатар хот Бага тойруу, ШУТИС VIII-байр",
    phone: "(976)-77110096, (976)-77110097",
    email: "must-kosen@must.edu.mn",
  };

  return (
    <footer className="bg-gradient-to-r from-[#2f3a9a] via-[#223175] to-[#2f3a9a] text-white py-12 relative z-30 shadow-lg">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] pb-2 w-fit">
              Холбоос
            </h3>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] pb-2 w-fit">
              Холбоо барих
            </h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start gap-3">
                <span className="mt-1 text-[var(--color-accent)]">📍</span>
                {contactInfo.address}
              </p>
              <p className="flex items-center gap-3">
                <span className="text-[var(--color-accent)]">📞</span>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {contactInfo.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-[var(--color-accent)]">✉️</span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] pb-2 w-fit">
              Биднийг дагаарай
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/mustkosen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[var(--color-accent)] transition-colors duration-300 transform hover:scale-110"
              >
                <FaFacebook className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-10 pt-6 border-t border-[rgba(255,194,12,0.3)] text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} ШУТИС KOSEN. Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone, Globe, Home } from "lucide-react";
import ImportantLinksSidebar from "../Home/ImportantLinksSidebar";

export interface DropdownItem {
  label: string;
  href: string;
  imageSrc?: string;
  subItems?: DropdownItem[];
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface HeaderProps {
  title: string;
  subtitle: string;
  navItems: NavItem[];
  onLanguageChange: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  navItems,
  onLanguageChange,
  className,
}) => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredSubNav, setHoveredSubNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: "#07158F",
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <header
      className={` bg-white shadow-lg z-50 relative pointer-events-auto ${className}`}
    >
      {isSidebarOpen && (
        <ImportantLinksSidebar onClose={() => setIsSidebarOpen(false)} />
      )}
      <div className="w-full max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center my-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={"/"}>
                <Image
                  src={"/images/koocen.png"}
                  alt="Logo"
                  width={400}
                  height={100}
                  className=""
                />
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href="https://elselt.edu.mn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="hidden lg:inline-flex items-center text-white bg-[#07158F] hover:bg-[#0a1fa5] font-semibold px-4 py-2 rounded-full transition duration-300 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Элсэлтийн бүртгэл
              </motion.button>
            </a>

            <motion.button
              onClick={() => setIsSidebarOpen(true)}
              className="hidden lg:inline-flex items-center text-[#07158F] bg-[#ffc20c] hover:bg-[#ffce36] font-semibold px-4 py-2 rounded-full transition duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Чухал холбоос
            </motion.button>

            <motion.button
              onClick={onLanguageChange}
              className="text-gray-700 hover:text-[#07158F] font-medium flex items-center space-x-1 bg-white px-3 py-1.5 rounded-full border border-gray-300 hover:border-[#ffc20c] transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Globe className="h-4 w-4" />
              <ChevronDown className="h-4 w-4" />
            </motion.button>
            <motion.div
              className="relative group text-gray-700 hover:text-[#07158F] font-medium flex items-center bg-white px-3 py-1.5 rounded-full border border-gray-300 hover:border-[#ffc20c] transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="h-4 w-4" />
              <Link
                href="/contact"
                className="ml-2 overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap"
              >
                Холбоо барих
              </Link>
            </motion.div>

            <button
              className="lg:hidden text-gray-700 hover:text-[#07158F]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="lg:hidden border-t border-gray-200 py-4"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="mb-4">
                <Link
                  href="/"
                  className="flex items-center px-2 py-2 text-gray-700 font-semibold hover:text-[#07158F]"
                >
                  <Home className="h-6 w-6 mr-2" />
                  <span>Нүүр</span>
                </Link>
              </div>
              {navItems.map((item) => (
                <div key={item.label} className="mb-4">
                  <div
                    className="flex items-center justify-between px-2 py-2 text-gray-700 font-semibold hover:text-[#07158F]"
                    onClick={() =>
                      setHoveredNav(
                        hoveredNav === item.label ? null : item.label
                      )
                    }
                  >
                    <Link href={item.href}>{item.label}</Link>
                    {item.dropdownItems && (
                      <motion.div
                        animate={{
                          rotate: hoveredNav === item.label ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {item.dropdownItems && hoveredNav === item.label && (
                      <motion.div
                        className="ml-4"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {item.dropdownItems.map((dropdown) => (
                          <div key={dropdown.label} className="mb-2">
                            <div
                              className="flex items-center justify-between px-2 py-2 text-gray-700 text-sm hover:text-[#07158F]"
                              onClick={() =>
                                setHoveredSubNav(
                                  hoveredSubNav === dropdown.label
                                    ? null
                                    : dropdown.label
                                )
                              }
                            >
                              <Link
                                href={dropdown.href}
                                className="flex items-center"
                              >
                                {dropdown.imageSrc && (
                                  <Image
                                    src={dropdown.imageSrc}
                                    alt={dropdown.label}
                                    width={16}
                                    height={16}
                                    className="mr-2 rounded-sm"
                                  />
                                )}
                                <span>{dropdown.label}</span>
                              </Link>
                              {dropdown.subItems && (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                            <AnimatePresence>
                              {dropdown.subItems &&
                                hoveredSubNav === dropdown.label && (
                                  <motion.div
                                    className="ml-4"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                  >
                                    {dropdown.subItems.map((subItem) => (
                                      <Link
                                        key={subItem.label}
                                        href={subItem.href}
                                        className="flex items-center px-2 py-2 text-gray-700 text-sm hover:bg-gray-100 transition-all duration-200"
                                      >
                                        {subItem.imageSrc && (
                                          <Image
                                            src={subItem.imageSrc}
                                            alt={subItem.label}
                                            width={16}
                                            height={16}
                                            className="mr-2 rounded-sm"
                                          />
                                        )}
                                        <span>{subItem.label}</span>
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
        <nav className="hidden lg:flex justify-center space-x-8 py-4 border-t border-gray-200">
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            className="text-gray-700 font-semibold flex items-center"
          >
            <Link href="/" title="Нүүр">
              <Home className="h-5 w-5" />
            </Link>
          </motion.div>
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <motion.div
                variants={linkVariants}
                whileHover="hover"
                className="text-gray-700 font-semibold flex items-center space-x-1"
              >
                <Link href={item.href}>{item.label}</Link>
                {item.dropdownItems && (
                  <motion.div
                    animate={{ rotate: hoveredNav === item.label ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                )}
              </motion.div>
              <AnimatePresence>
                {item.dropdownItems && hoveredNav === item.label && (
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-20 border border-gray-200"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {item.dropdownItems.map((dropdown) => (
                      <div
                        key={dropdown.label}
                        className="relative group/sub"
                        onMouseEnter={() => setHoveredSubNav(dropdown.label)}
                        onMouseLeave={() => setHoveredSubNav(null)}
                      >
                        <Link
                          href={dropdown.href}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 text-sm font-medium"
                        >
                          {dropdown.imageSrc && (
                            <Image
                              src={dropdown.imageSrc}
                              alt={dropdown.label}
                              width={20}
                              height={20}
                              className="mr-2 rounded-sm"
                            />
                          )}
                          <span>{dropdown.label}</span>
                        </Link>
                        <AnimatePresence>
                          {dropdown.subItems &&
                            hoveredSubNav === dropdown.label && (
                              <motion.div
                                className="absolute left-full top-0 w-56 bg-white shadow-lg rounded-md py-2 ml-1 z-20 border border-gray-200"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                {dropdown.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 text-sm font-medium pl-6"
                                  >
                                    {subItem.imageSrc && (
                                      <Image
                                        src={subItem.imageSrc}
                                        alt={subItem.label}
                                        width={20}
                                        height={20}
                                        className="mr-2 rounded-sm"
                                      />
                                    )}
                                    <span>{subItem.label}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
      <style jsx>{`
        .glow {
          box-shadow: 0 0 12px rgba(0, 183, 230, 0.4);
        }
      `}</style>
    </header>
  );
};

export default Header;

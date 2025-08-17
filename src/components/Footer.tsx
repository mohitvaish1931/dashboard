import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, BarChart3 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-mint-500/20 backdrop-blur-sm border border-pink-500/30">
                <BarChart3 className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-mint-400 bg-clip-text text-transparent">
                DataViz Pro
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Advanced data visualization platform with real-time analytics and beautiful interactive dashboards.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Mail, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-pink-400/50 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 text-gray-400 hover:text-pink-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Analytics', 'Reports', 'API'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Contact', 'Blog'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {['Documentation', 'Help Center', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-400 text-sm">
            © 2025 DataViz Pro. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with</span>
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-pink-400 rounded-full"
              ></motion.div>
              <span className="text-gray-400 text-sm">by the DataViz team</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
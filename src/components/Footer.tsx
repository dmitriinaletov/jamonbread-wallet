export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-left py-4 mt-6">
      <hr className="border-gray-600 mb-4" />
      <p className="text-sm">
        <span>Contact: info@example.com</span> | <span>Phone: +123456789</span>
      </p>
      <p className="text-xs">
        &copy; {currentYear} My Company. All rights reserved.
      </p>
    </footer>
  );
};

import logo from '@assets/amazon-white.png';
import globe from '@assets/earth-globe.png';
import egyptIco from '@assets/egypt.jpg';
import scrollToTop from '@utils/scrollToTop';

export default function Footer() {
  return (
    <>
      <footer className="bg-[#232F3E] text-sm text-[#ADB1B7]">
        {/* Back to Top */}
        <div
          className="flex cursor-pointer items-center justify-center bg-[#37475A] p-3 text-white hover:opacity-80"
          onClick={scrollToTop}
        >
          Back to Top
        </div>

        {/* Footer Links */}
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {footerData.map((section, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold text-white">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link, i) => (
                  <li key={i} className="cursor-pointer hover:underline">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-center space-y-4 border-t border-[#595b5e] px-6 py-6 sm:flex-row sm:space-y-0 sm:space-x-6">
          <img src={logo} height={50} width={100} alt="Amazon Logo" />
          <div className="flex flex-wrap justify-center space-x-4 sm:justify-start">
            <div className="flex cursor-pointer items-center rounded-md border px-4 py-2">
              <img src={globe} width={20} alt="Globe" />
              <span className="ml-2">English</span>
            </div>
            <div className="flex cursor-pointer items-center rounded-md border px-4 py-2">
              <img src={egyptIco} width={20} alt="Egypt Flag" />
              <span className="ml-2">Egypt</span>
            </div>
          </div>
        </div>

        {/* Footer Legal Links */}
        <div className="bg-[#131A22] py-4 text-center text-xs text-[#ADB1B7]">
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="/" className="hover:underline">
              Condition of Use & Sales
            </a>
            <a href="/" className="hover:underline">
              Privacy
            </a>
            <a href="/" className="hover:underline">
              Help
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

const footerData = [
  {
    title: 'Get to Know Us',
    links: ['About Us', 'Careers', 'Press Releases', 'Amazon Science']
  },
  {
    title: 'Connect with Us',
    links: ['Facebook', 'Twitter', 'Instagram']
  },
  {
    title: 'Make Money with Us',
    links: [
      'Sell on Amazon',
      'Sell under Amazon Accelerator',
      'Protect and Build Your Brand',
      'Amazon Global Selling',
      'Supply to Amazon',
      'Become an Affiliate',
      'Fulfillment by Amazon',
      'Advertise Your Products',
      'Amazon Pay for Merchants'
    ]
  },
  {
    title: 'Let Us Help You',
    links: [
      'Your Account',
      'Returns Center',
      'Recalls and Product Safety Alerts',
      '100% Purchase Protection',
      'Amazon App Download',
      'Help'
    ]
  }
];

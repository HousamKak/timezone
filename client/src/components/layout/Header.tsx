import { useLocation, useNavigate } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Header = ({ onThemeToggle, isDarkMode }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      label: 'Dashboard', 
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    { 
      label: 'New Trade - Analyst', 
      icon: 'pi pi-plus',
      command: () => navigate('/new-trade-analyst')
    },
    { 
      label: 'New Trade - PM', 
      icon: 'pi pi-briefcase',
      command: () => navigate('/new-trade-pm')
    },
    // { 
    //   label: 'Trade History - Analyst', 
    //   icon: 'pi pi-history',
    //   command: () => navigate('/history')
    // },
    // { 
    //   label: 'Performance', 
    //   icon: 'pi pi-chart-line',
    //   command: () => navigate('/performance')
    // }
  ];

  // Determine active index based on current path
  const getActiveIndex = () => {
    const path = location.pathname;
    
    if (path === '/') return 0;
    if (path === '/new-trade-analyst') return 1;
    if (path === '/new-trade-pm') return 2;
    // if (path === '/history') return 3;
    // if (path === '/performance') return 4;
    return 0;
  };  return (
    <div className="header-container" style={{ backgroundColor: '#cee7f399', margin: 0, padding: 0 }}>
      <div className="flex align-items-center justify-content-between px-4 py-2"> 
        <div className="flex align-items-center">
          <div className="flex align-items-center gap-2">
            <img 
              src="/src/assets/orbimed-logo.webp" 
              alt="OrbiMed Logo" 
              className="w-3 h-3 object-contain"
              onError={(e) => {
                // Fallback to icon if logo doesn't exist
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <i className="pi pi-chart-bar text-xl text-primary hidden"></i>
            <span className="font-semibold text-base text-900 ml-2" style={{ marginTop: 'auto' }}>Analyst Trade Portal</span>
          </div>
          
          {/* Inline Navigation */}
          <div className="hidden lg:flex align-items-center gap-1">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                label={item.label}
                icon={item.icon}
                onClick={item.command}
                text
                size="small"
                className={`p-button-sm px-3 ${
                  getActiveIndex() === index 
                    ? 'p-button-primary text-primary' 
                    : 'p-button-secondary text-600'
                }`}
                style={{ gap: '0.25rem' }}
              />
            ))}</div>
        </div>

        {/* Right: Theme toggle and User info */}
        <div className="flex align-items-center gap-3">
          <Button 
            id="theme-toggle"
            icon={isDarkMode ? 'pi pi-sun' : 'pi pi-moon'}
            onClick={onThemeToggle}
            rounded
            text
            size="small"
            className="text-600"
          />
          <Tooltip target="#theme-toggle" content={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} />
          
          <div className="flex align-items-center gap-2 px-2">
            <Avatar 
              label={currentUser.name.split(' ').map(n => n[0]).join('')}
              size="normal"
              className="bg-primary text-white"
              style={{ width: '24px', height: '24px', fontSize: '10px' }}
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium text-900">{currentUser.name}</div>
              <div className="text-xs text-600">{currentUser.role}</div>
            </div>
          </div>
        </div>
      </div>      
      {/* Mobile Navigation - Only show on smaller screens */}
      <div className="lg:hidden px-4">
        <TabMenu 
          model={menuItems} 
          activeIndex={getActiveIndex()}
          className="border-none p-tabmenu-clean"
        />
      </div>
    </div>
  );
};

export default Header;

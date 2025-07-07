// components/Sidebar.jsx (updated with navigation)
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Collapse 
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { SIDEBAR_SECTIONS } from '../constants/sidebarConstants';
import { FaPhone, FaServer, FaNetworkWired, FaTools, FaRoute, FaFilter, FaEdit, FaCog, FaChartBar, FaExclamationTriangle } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [openSections, setOpenSections] = useState({
    operationInfo: false,
    sip: false,
    pcm: false,
    isdn: false,
    fax: false,
    route: false,
    numberFilter: false,
    manipulate: false,
    vpn: false,
    dhcp: false,
    systemTools: false
  });

  const handleToggle = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const renderSubmenuItems = (submenuItems) => {
    return submenuItems.map((item) => (
      <ListItem 
        key={item.id}
        button 
        sx={{ 
          pl: 2,
          backgroundColor: isActive(item.path) ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          }
        }}
        className="cursor-pointer"
        onClick={() => handleNavigation(item.path)}
      >
        <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
          <FiberManualRecordIcon 
            sx={{ 
              fontSize: 8,
              color: isActive(item.path) ? 'primary.main' : 'inherit',
            }} 
          />
        </ListItemIcon>
        <ListItemText 
          primary={item.title}
          sx={{
            '& .MuiTypography-root': {
              color: isActive(item.path) ? 'primary.main' : 'inherit',
              fontWeight: isActive(item.path) ? 600 : 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: 15,
            }
          }}
        />
      </ListItem>
    ));
  };

  const renderSidebarSection = (section) => {
    const IconComponent = section.icon;
    const isCurrentActive = isActive(section.path) || 
      (section.submenuItems && section.submenuItems.some(item => isActive(item.path)));
    
    return (
      <React.Fragment key={section.id}>
        <ListItem 
          button 
          onClick={() => {
            if (section.hasSubmenu) {
              handleToggle(section.id);
            } else {
              handleNavigation(section.path);
            }
          }}
          sx={{
            backgroundColor: isCurrentActive ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
          className="cursor-pointer"
        >
          <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
            <IconComponent 
              sx={{ 
                color: isCurrentActive ? 'primary.main' : 'inherit',
              }} 
            />
          </ListItemIcon>
          <ListItemText 
            primary={section.title}
            sx={{
              '& .MuiTypography-root': {
                color: isCurrentActive ? 'primary.main' : 'inherit',
                fontWeight: isCurrentActive ? 600 : 400,
              }
            }}
          />
          {section.hasSubmenu && (
            openSections[section.id] ? <ExpandLess /> : <ExpandMore />
          )}
        </ListItem>
        
        {section.hasSubmenu && (
          <Collapse in={openSections[section.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderSubmenuItems(section.submenuItems)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: '96px',
          height: 'calc(100% - 96px)',
        },
      }}
    >
      <div role="presentation">
        <List>
          {SIDEBAR_SECTIONS.map(renderSidebarSection)}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
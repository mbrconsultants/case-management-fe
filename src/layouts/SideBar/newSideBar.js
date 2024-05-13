import React, { Fragment, useState, useEffect, useContext } from "react";
import { MENUITEMS,MODULEITEMS } from "./SideMenu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import { LogoutOutlined } from "@mui/icons-material";
import { Context } from "../../context/Context";


const Sidebar = () => {
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const { dispatch } = useContext(Context);



  const handleSignout =()=>{
    dispatch({type: "LOGOUT"});
    window.location.replace('/login')
  }
  useEffect(() => {
    const currentUrl = window.location.pathname.slice(0, -1);
    mainmenu.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
  }, []);
  const setNavActive = (item) => {
    MENUITEMS.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== item) {
          Items.active = false;
        }
        
        if (Items.children && Items.children.includes(item)) {
          Items.active = true;
        }
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };
//   const navigate = useNavigate();
//   const dispatch = useAuthDispatch() // read dispatch method from context
//   // const userDetails = useAuthState()
//   const handleLogout = () => {
//     logout(dispatch) //call the logout action
    
//    navigate('/login') //navigate to logout page on logout
// }
  const toggletNavActive = (item) => {
    if (window.innerWidth <= 991) {
      if (item.type === "sub") {

       
      }
    }
    if (!item.active) {
      MENUITEMS.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  //Hover effect
  function Onhover() {
    if (document.querySelector(".app").classList.contains("sidenav-toggled"))
      document.querySelector(".app").classList.add("sidenav-toggled-open");
  }
  function Outhover() {
    document.querySelector(".app").classList.remove("sidenav-toggled-open");
  }

  return (
    <div className="sticky">
      <div className="app-sidebar__overlay"></div>
      <aside
        className="app-sidebar" 
        onMouseOver={() => Onhover()}
        onMouseOut={() => Outhover()}
      >
        <Scrollbars >
          <div className="header side-header">
            <Link
              to={`${process.env.PUBLIC_URL}/landing/`}
              className="header-brand1"
            >
              <img
                src={require("../../assets/images/brand/njc-logo.png")}
                className="header-brand-img desktop-logo"
                alt={"logo"}
              />
              <img
                src={require("../../assets/images/brand/njc-logo.png")}
                className="header-brand-img toggle-logo"
                alt={"logo-1"}
              />
              <img
                src={require("../../assets/images/brand/njc-logo.png")}
                className="header-brand-img light-logo"
                alt={"logo-2"}
              />
              <img
                src={require("../../assets/images/brand/njc-logo.png")}
                className="header-brand-img light-logo1"
                alt={"logo-3"}
              />
            </Link>
          </div>
          <div className="main-sidemenu">
            <div className="slide-left disabled" id="slide-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
              </svg>
            </div>
            <div className="slide-leftRTL disabled" id="slide-leftRTL">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
              </svg>
            </div>
            <ul className="side-menu" id="sidebar-main">
              {MENUITEMS.map((Item, i) => (
                <Fragment key={i}>
                  <li className="sub-category">
                    <h3>{Item.menutitle}</h3>
                  </li>
                  {Item.Items.map((menuItem, i) => (
                    <li
                      className={`slide ${
                        menuItem.active ? "is-expanded" : ""
                      }`}
                      key={i}
                    >
                      {menuItem.type === "link" ? (
                        <NavLink
                          to={menuItem.path + "/"}
                          className={`side-menu__item ${
                            menuItem.active ? "active" : ""
                          }`}
                          onClick={() => {
                            setNavActive(menuItem);
                            toggletNavActive(menuItem);
                          }}
                        >
                          <i
                            className={`side-menu__icon fe fe-${menuItem.icon}`}
                          ></i>
                          <span className="side-menu__label">
                            {menuItem.title}
                          </span>
                          {menuItem.badge ? (
                            <label className={`${menuItem.badge} side-badge`}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ""
                          )}
                        </NavLink>
                      ) : (
                        ""
                      )}

                      {menuItem.type === "sub" ? (
                       
                        <NavLink
                          to={menuItem.path + "/"}
                          className={`side-menu__item ${
                            menuItem.active ? "active" : ""
                          }`}
                          onClick={(event) => {
                           
                            
                            event.preventDefault();
                            setNavActive(menuItem);
                          }}
                        >
                          <i
                            className={`side-menu__icon fe fe-${menuItem.icon}`}
                          ></i>
                          <span className="side-menu__label">
                            {menuItem.title}
                          </span>
                          {menuItem.badge ? (
                            <label className={`${menuItem.badge} side-badge`}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ""
                          )}
                          <i
                            className={`${menuItem.background} fa angle fa-angle-right `}
                          ></i>
                        </NavLink>
                      ) : (
                        ""
                      )}
                      {menuItem.children ? (
                        <ul
                          className="slide-menu"
                          style={
                            menuItem.active
                              ? {
                                  opacity: 1,
                                  transition: "opacity 500ms ease-in",
                                  display: "block",
                                }
                              : { display: "none" }
                          }
                        >
                          {menuItem.children.map((childrenItem, index) => {
                            return (
                              <li key={index}>
                                {childrenItem.type === "sub" ? (
                                  <a
                                    href="javascript"
                                    className="sub-side-menu__item"
                                    onClick={(event) => {
                                      event.preventDefault();
                                                                          
                                      toggletNavActive(childrenItem);
                                    }}
                                  >
                                    <span className="sub-side-menu__label">
                                      {childrenItem.title}
                                    </span>
                                    {childrenItem.active ? (
                                      <i className="sub-angle  fa fa-angle-down"></i>
                                    ) : (
                                      <i className="sub-angle fa fa-angle-right"></i>
                                    )}
                                  </a>
                                ) : (
                                  ""
                                )}
                                {childrenItem.type === "link" ? (
                                  <NavLink
                                    to={childrenItem.path + "/"}
                                    className="slide-item"
                                    onClick={() =>{
                                      
                                      toggletNavActive(childrenItem)
                                    }}
                                  >
                                    {childrenItem.title}
                                  </NavLink>
                                ) : (
                                  ""
                                )}
                                {childrenItem.children ? (
                                  <ul
                                    className="sub-slide-menu"
                                    style={
                                      childrenItem.active
                                        ? { display: "block" }
                                        : { display: "none" }
                                    }
                                  >
                                    {childrenItem.children.map(
                                      (childrenSubItem, key) => (
                                        <li key={key}>
                                          {childrenSubItem.type === "link" ? (
                                            <NavLink
                                              to={childrenSubItem.path + "/"}
                                              className={`${"sub-slide-item"}`}
                                              onClick={() =>
                                                toggletNavActive(
                                                  childrenSubItem
                                                )
                                              }
                                            >
                                              {childrenSubItem.title}
                                            </NavLink>
                                          ) : (
                                            ""
                                          )}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  ""
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
            <div className="slide-right" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
              </svg>
            </div>
            <div className="slide-rightRTL" id="slide-rightRTL">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
              </svg>
            </div>
          </div>
            <div style={{
              display: 'flex',
              gap: "10px",
              alignItems: "center",
              padding: '10px 5px',
              cursor: "pointer",
              marginLeft: "20px"
            }} onClick={handleSignout}>
                <LogoutOutlined />
              <span>Sign out</span>
            </div>
        </Scrollbars>
      </aside>
    </div>
  );
};

export default Sidebar;

import React, { Fragment, useContext, useState } from "react";
import { Context } from "../../context/Context.js"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSideBarContext } from "../../context/SideBarContextProvider.js";

const MyHrSideMenu = () => {
  const { user } = useContext(Context)
  const { submodules } = useSideBarContext()
  const newSub = JSON.parse(submodules)
  const userSubmodules = newSub.submodule
  // console.log("sub 3", userSubmodules)
  
  const menus = [
    {
      // menutitle: "MAIN",
      Items: [
        {
          path: `${process.env.PUBLIC_URL}/dashboard`,
          icon: "home",
          type: "link",
          active: true,
          title: "Dashboard",
        }
      ],
    },

    {
      // menutitle: "Elements",
      Items: [
        {
          title: "Self Service",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/userprofile/${user.user.id}`,
              type: "link",
              title: "My profile",
            },
          ],
        },
        {
          title: "Registry",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/create-user`,
              type: "link",
              title: "New Staff",
            },
            {
              path: `${process.env.PUBLIC_URL}/users`,
              type: "link",
              title: "Staff Documentation",
            },
            {
              path: `${process.env.PUBLIC_URL}/staff-file`,
              type: "link",
              title: "Staff Profile",
            },
            {
              path: `${process.env.PUBLIC_URL}/emolument`,
              type: "link",
              title: "Emolument Record",
            },
            {
              path: `${process.env.PUBLIC_URL}/record-of-service`,
              type: "link",
              title: "Record of Service",
            },
            {
              path: `${process.env.PUBLIC_URL}/title`,
              type: "link",
              title: "title",
            },
            {
              path: `${process.env.PUBLIC_URL}/designation`,
              type: "link",
              title: "designation",
            },

          ],
        },
       
        {
          title: "Department",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/Departments`,
              type: "link",
              title: "Departments",
            },
            {
              path: `${process.env.PUBLIC_URL}/units`,
              type: "link",
              title: "Units",
            },
            {
              path: `${process.env.PUBLIC_URL}/department-units`,
              type: "link",
              title: "Department Units",
            },

          ],
        },
        {
          title: "File",
          icon: "file",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/file-category-setup`,
              title: "File Category Setup",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/file-subcategory-setup`,
              title: "File Sub-Category Setup",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/all-file`,
              title: "All Files",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/create-files`,
              title: "Create Files Jacket",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/upload-document`,
              title: "Upload Document",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/sent-files`,
              title: "Sent Files",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/receive-send-file`,
              title: "Receive/Move File",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/track-file`,
              title: "Track File",
              type: "link",
            },

          ],
        },
        {
          title: "Leave",
          icon: "home",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/leave-type`,
              title: "Leave Type",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/leave-num-days`,
              title: "Leave No. of Days",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/leave-roaster`,
              title: "Leave Roaster",
              type: "link",
            },

            {
              path: `${process.env.PUBLIC_URL}/leave-application`,
              title: "Leave Application",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/leave-roaster-approval`,
              title: "Leave Roaster Approval",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/leave-application-approval`,
              title: "Leave Application Approval",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/leave-resumption`,
              title: "Leave Resumption",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/Holidays`,
              title: "Holidays",
              type: "link",
            },

          ],
        },
        {
          title: "Discipline",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/disciplinary-setup`,
              title: "Disciplinary Setup",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/create-violation`,
              title: "Violation Setup",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/disciplinary-action`,
              title: "Disciplinary Action Setup",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/report-offence`,
              title: "Report Offence",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/create-discipline`,
              title: "Discipline a Staff",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/disciplined`,
              title: "Disciplined Staff",
              type: "link",
            },
          ],
        },
        {
          title: "Nominal Roll",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/nominalroll-setup`,
              title: "NominalRoll Setup",
              type: "link",
            },
          ],
        },
        {
          title: "Training",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/training`,
              title: "Training",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/training-type`,
              title: "Training Type",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/create-training`,
              title: "Create Training",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/select-training-candidate`,
              title: "Select Candidate",
              type: "link",
            },

          ],
        },
        {
          title: "Nominal Roll",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/distribution-by-zone`,
              title: "Distribution By Zone",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/distribution-by-origin`,
              title: "Distribution By State of Origin",
              type: "link",
            },

          ],
        },
        {
          title: "Promotion",
          icon: "package",
          type: "sub",
          active: false,
          children: [


          ],
        },
        {
          title: "Record and Variation",
          icon: "package",
          type: "sub",
          active: false,
          children: [


          ],
        },
        {
          title: "Gazetting",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/gazette`,
              title: "Gazette Staff",
              type: "link",
            },

          ],
        },
        {
          title: "NHF",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/nhf`,
              title: "Staff NHF",
              type: "link",
            },

          ],
        },
        {
          title: "NHIS",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/nhis`,
              title: "Staff NHIS",
              type: "link",
            },

          ],
        },
        {
          title: "Role Management",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/role`,
              title: "Create Role",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/module-list`,
              title: "Create Module",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/submodule-list`,
              title: "Create Submodule",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/assign-module-to-role`,
              title: "Assign Module to role",
              type: "link",
            },

          ],
        },

      ]
    }
  ]
  const [mainmenu, setMainMenu] = useState([]);
  const [mainn, setMainn] = useState([]);
  useEffect(() => {
    setMainMenu(menus);
    setMainn(menus);
  }, [])

  const setNavActive = (item) => {

    mainn?.map((menuItems) => {
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
    setMainMenu({mainmenu:mainn});
  };

  const toggletNavActive = (item) => {
    let mainn=mainmenu;
    // console.log(mainn);
    if (window.innerWidth <= 991) {
      if (item.type === "sub") {

      }
    }
    if (!item.active) {
      
      mainn.map((a) => {
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
      setMainMenu({mainmenu:mainn});
  };
  
  return (
    <>
      {mainn?.map((Item, i) => (
        <Fragment key={i}>
          <li className="sub-category">
            <h3>{Item.menutitle}</h3>
          </li>
          {Item.Items.map((menuItem, i) => (
            <li
              className={`slide ${menuItem.active ? "is-expanded" : ""
                }`}
              key={i}
            >
              {menuItem.type === "link" ? (
                <NavLink
                  to={menuItem.path + "/"}
                  className={`side-menu__item ${menuItem.active ? "active" : ""
                    }`}
                  onClick={() => {
                    toggletNavActive(menuItem);
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
                </NavLink>
              ) : (
                ""
              )}

              {menuItem.type === "sub" ? (

                <NavLink
                  to={menuItem.path + "/"}
                  className={`side-menu__item ${menuItem.active ? "active" : ""
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
                            onClick={() => {

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
    </>
  )
}

export default MyHrSideMenu
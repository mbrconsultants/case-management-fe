export const MENUITEMS = [
    {
      menutitle: "MAIN",
      Items: [
        {
          path: `${process.env.PUBLIC_URL}/dashboard`,
          icon: "home",
          type: "link",
          active: true,
          title: "Overview",
        },
      ],
    },
    // {
    //   menutitle: "WIDGETS",
    //   Items: [
    //     {
    //       path: `${process.env.PUBLIC_URL}/widgets`,
    //       icon: "grid",
    //       type: "link",
    //       active: false,
    //       title: "Widgets",
    //     },
    //   ],
    // },
  
    {
      menutitle: "Elements",
      Items: [
        {
          title: "Vehicle Managenent",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/form/add-vehicle`,
              type: "link",
              title: "Vehicle Registration",
            },
            {
              path: `${process.env.PUBLIC_URL}/components/form/insurance`,
              type: "link",
              title: "Insurance",
            },
            {
              path: `${process.env.PUBLIC_URL}/components/form/driver`,
              type: "link",
              title: "Driver",
            },
            {
              path: `${process.env.PUBLIC_URL}/components/form/filling-station`,
              type: "link",
              title: "Filling Station",
            },
            {
              path: `${process.env.PUBLIC_URL}/components/form/coupon`,
              type: "link",
              title: "Coupons",
            },
          
          ],
        },
        {
          title: "Payment",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/elements/alerts`,
              title: "New Payment",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/elements/buttons`,
              title: "Verify Payment",
              type: "link",
            },
            {
              path: `${process.env.PUBLIC_URL}/elements/colors`,
              title: "Other Sub-Menu",
              type: "link",
            },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/avatarSquares`,
            //   title: "Avatar-Squares",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/avatarRounded`,
            //   title: "Avatar-Rounded",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/avatarRadius`,
            //   title: "Avatar-Raduis",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/dropDowns`,
            //   title: "Drop downs",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/list`,
            //   title: "List",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/tags`,
            //   title: "Tags",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/paginations`,
            //   title: "Paginations",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/navigation`,
            //   title: "Navigation",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/typography`,
            //   title: "Typography",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/breadcrumbs`,
            //   title: "Breadcrumbs",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/badges`,
            //   title: "Badges",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/panels`,
            //   title: "Panels",
            //   type: "link",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/elements/thumbnails`,
            //   title: "Thumbnails",
            //   type: "link",
            // },
          ],
        },
        {
          title: "Audit Voucher",
          icon: "layers",
          type: "sub",
          bookmark: true,
          active: false,
          children: [
            {
              path:`${process.env.PUBLIC_URL}/voucher/audited`,
              type: "link",
              title: "Audited",
            },
            {
              path:`${process.env.PUBLIC_URL}/voucher/notaudited`,
              type: "link",
              title: "Ready to be Audited",
            },
          
          ],
        },
  
        {
          title: "Finance",
          icon: "layers",
          type: "sub",
          bookmark: true,
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/advancedElements/mediaObject`,
              type: "link",
              title: "Sub-menus here",
            },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/accordions`,
            //   type: "link",
            //   title: "Accordions",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/tabs`,
            //   type: "link",
            //   title: "Tabs",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/charts`,
            //   type: "link",
            //   title: "Charts",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/modal`,
            //   type: "link",
            //   title: "Modal",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/tooltipandpopover`,
            //   type: "link",
            //   title: "Tooltip and popover",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/progress`,
            //   type: "link",
            //   title: "Progress",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/carousels`,
            //   type: "link",
            //   title: "Carousels",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/headers`,
            //   type: "link",
            //   title: "Headers",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/footers`,
            //   type: "link",
            //   title: "Footers",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/userList`,
            //   type: "link",
            //   title: "UserList",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/search`,
            //   type: "link",
            //   title: "Search",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/cryptoCurrencies`,
            //   type: "link",
            //   title: "CryptoCurrencies",
            // },
          ],
        },
        {
          title: "Audit Report",
          icon: "layers",
          type: "sub",
          bookmark: true,
          active: false,
          children: [
            {
              path:`${process.env.PUBLIC_URL}/components/form/driver`,
              // `${process.env.PUBLIC_URL}/advancedElements/mediaObject`,
              type: "link",
              title: "Sub-menus here",
            },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/accordions`,
            //   type: "link",
            //   title: "Accordions",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/tabs`,
            //   type: "link",
            //   title: "Tabs",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/charts`,
            //   type: "link",
            //   title: "Charts",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/modal`,
            //   type: "link",
            //   title: "Modal",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/tooltipandpopover`,
            //   type: "link",
            //   title: "Tooltip and popover",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/progress`,
            //   type: "link",
            //   title: "Progress",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/carousels`,
            //   type: "link",
            //   title: "Carousels",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/headers`,
            //   type: "link",
            //   title: "Headers",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/footers`,
            //   type: "link",
            //   title: "Footers",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/userList`,
            //   type: "link",
            //   title: "UserList",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/search`,
            //   type: "link",
            //   title: "Search",
            // },
            // {
            //   path: `${process.env.PUBLIC_URL}/advancedElements/cryptoCurrencies`,
            //   type: "link",
            //   title: "CryptoCurrencies",
            // },
          ],
        },
        // {
        //   title: "Log out",
        //   icon: "link",
        //   type: "sub",
        //   bookmark: true,
        //   active: false,
        // },
      ],
    },
  
    // {
    //   menutitle: "CHARTS & TABLES",
    //   Items: [
    //     {
    //       title: "charts",
    //       icon: "pie-chart",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: `${process.env.PUBLIC_URL}/charts/chartJs`,
    //           title: " ChartJs",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/charts/echarts`,
    //           title: "ECharts",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/charts/nvd3Charts`,
    //           title: "Nvd3 Charts",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/charts/pieCharts`,
    //           title: "Pie Charts",
    //           type: "link",
    //         },
    //       ],
    //     },
  
    //     {
    //       title: "Tables",
    //       icon: "clipboard",
    //       type: "sub",
    //       badge1: true,
    //       badge: "badge bg-secondary",
    //       badgetxt: "2",
    //       background: "hor-rightangle",
    //       active: false,
    //       children: [
    //         {
    //           path: `${process.env.PUBLIC_URL}/tables/defaultTables`,
    //           title: " Default Tables",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/tables/dataTables`,
    //           title: "Data Tables ",
    //           type: "link",
    //         },
    //       ],
    //     },
    //   ],
    // },
  
    // {
    //   menutitle: "PAGES",
    //   Items: [
    //     {
    //       title: "Pages",
    //       icon: "layers",
    //       type: "sub",
    //       badge2: true,
    //       active: false,
    //       children: [
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/profile`,
    //           title: "Profile",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/editProfile`,
    //           title: "Edit Profile",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/mailInbox`,
    //           title: "Mail Inbox",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/mailCompose`,
    //           title: "Mail Compose",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/gallery`,
    //           title: "Gallery",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/aboutCompany`,
    //           title: "About Company",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/services`,
    //           title: "Services",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/faqs`,
    //           title: "FAQS",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/terms`,
    //           title: "Terms",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/invoice`,
    //           title: "Invoice",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/pricingTables`,
    //           title: "Pricing Tables",
    //           type: "link",
    //         },
  
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/empty`,
    //           title: "Empty",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/underConstruction`,
    //           title: "Under Construction",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/pages/themeStyle`,
    //           title: "Theme Style",
    //           type: "link",
    //         },
    //         {
    //           title: "Blog",
    //           type: "sub",
    //           active: false,
    //           children: [
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/Blog/blog`,
    //               title: "Blog",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/Blog/blogDetails`,
    //               title: "Blog Details",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/Blog/blogPost`,
    //               title: "Blog Post",
    //               type: "link",
    //             },
    //           ],
    //         },
    //         {
    //           title: "Maps",
    //           icon: "globe",
    //           type: "sub",
    //           active: false,
    //           children: [
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/maps/leafletMaps`,
    //               type: "link",
    //               title: "Leaflet Maps ",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/maps/vectorMaps`,
    //               type: "link",
    //               title: "Vector Maps ",
    //             },
    //           ],
    //         },
    //         {
    //           title: "E-Commerce",
    //           icon: "shopping-cart",
    //           type: "sub",
    //           active: false,
    //           children: [
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/e-commerce/shop`,
    //               title: "Shop",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/e-commerce/productDetails`,
    //               title: "Product Details",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/e-commerce/shoppingCart`,
    //               title: "Shopping Cart",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/e-commerce/wishlist`,
    //               title: "Wishlist",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/e-commerce/checkout`,
    //               title: "Checkout",
    //               type: "link",
    //             },
    //           ],
    //         },
  
    //         {
    //           title: "File Manager",
    //           type: "sub",
    //           active: false,
    //           children: [
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/FileManager/FileManagerList/FileManagerList`,
    //               title: "File Manager List",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/FileManagerFileManager/FileManager`,
    //               title: "File Manager",
    //               type: "link",
    //             },
  
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/FileManager/FileDetails/FileDetails`,
    //               title: "File Details",
    //               type: "link",
    //             },
  
    //             {
    //               path: `${process.env.PUBLIC_URL}/pages/FileManager/FileAttachments/FileAttachments`,
    //               title: "File Attachments",
    //               type: "link",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
  
    // {
    //   menutitle: "CUSTOM & ERROR PAGES",
    //   Items: [
    //     {
    //       title: "Custom Pages",
    //       icon: "settings",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: `${process.env.PUBLIC_URL}/custompages/login`,
    //           title: "Login",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/custompages/register`,
    //           title: "Register",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/custompages/forgotPassword`,
    //           title: "Forgot Password",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/custompages/lockScreen`,
    //           title: "Lock Screen",
    //           type: "link",
    //         },
    //         {
    //           title: "Errors Pages",
    //           icon: "info",
    //           type: "sub",
    //           active: false,
    //           children: [
    //             {
    //               path: `${process.env.PUBLIC_URL}/custompages/errorpages/errorpage400`,
    //               title: "400",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/custompages/errorpages/errorpage401`,
    //               title: "401",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/custompages/errorpages/errorpage403`,
    //               title: "403",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/custompages/errorpages/errorpage500`,
    //               title: "500",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/custompages/errorpages/errorpage503`,
    //               title: "503",
    //               type: "link",
    //             },
    //           ],
    //         },
    //       ],
    //     },
  
    //     {
    //       title: "Submenus",
    //       icon: "sliders",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: `${process.env.PUBLIC_URL}/#`,
    //           title: "SubMenu1",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/#`,
    //           title: "SubMenu2",
    //           type: "sub",
    //           children: [
    //             {
    //               path: `${process.env.PUBLIC_URL}/#`,
    //               title: "SubMenu2-1",
    //               type: "link",
    //             },
    //             {
    //               path: `${process.env.PUBLIC_URL}/#`,
    //               title: "SubMenu2-2",
    //               type: "link",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   menutitle: "FORMS & ICONS",
    //   Items: [
    //     {
    //       title: "Forms",
    //       icon: "file-text",
    //       type: "sub",
    //       badge: "badge bg-success",
    //       badgetxt: "5",
    //       background: "hor-rightangle",
    //       active: false,
    //       children: [
    //         {
    //           path: `${process.env.PUBLIC_URL}/form/formElements`,
    //           title: "Form Elements",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/form/formAdvanced`,
    //           title: "Form Advanced",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/form/formEditor`,
    //           title: "Form Editor",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/form/formWizard`,
    //           title: "Form Wizard",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/form/formValidation`,
    //           title: "Form Validation",
    //           type: "link",
    //         },
    //       ],
    //     },
  
    //     {
    //       title: "Icons",
    //       icon: "command",
    //       type: "sub",
    //       children: [
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/fontAwesome`,
    //           title: "Font Awesome",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/materialDesignIcons`,
    //           title: "Material Design Icons",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/simpleLineIcons`,
    //           title: "Simple Line Icons",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/featherIcons`,
    //           title: "Feather Icons",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/ionicIcons`,
    //           title: "Ionic Icons",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/flagIcons`,
    //           title: "Flag Icons",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/pe7Icons`,
    //           title: "Pe7 Icons",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/themifyIcons`,
    //           title: "Themify Icons",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/typiconsIcons`,
    //           title: "Typicons Icons",
    //           type: "link",
    //         },
    //         {
    //           path: `${process.env.PUBLIC_URL}/icon/weatherIcons`,
    //           title: "Weather Icons",
    //           type: "link",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
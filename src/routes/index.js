import { lazy } from 'react';

// project imports
import Loadable from 'components/loadable';
import MinimalLayout from 'layout/MinimalLayout';
import InstituteMainLayout from 'layout/InstituteMainLayout';
import MainLayout from 'layout/MainLayout';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
// view imports

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// User Management
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const GroupsPage = Loadable(lazy(() => import('views/user-management/groups-page/groups-overview-page')));
const AddGroupPage = Loadable(lazy(() => import('views/user-management/groups-page/groups-add-page')));
const ViewGroupPage = Loadable(lazy(() => import('views/user-management/groups-page/groups[id]-page')));
const EditGroupPage = Loadable(lazy(() => import('views/user-management/groups-page/groups-edit-page')));
const UsersPage = Loadable(lazy(() => import('views/user-management/users-page/users-overview-page')));
const ViewUserPage = Loadable(lazy(() => import('views/user-management/users-page/users[id]-page')));
//Payment Management
const Payments = Loadable(lazy(() => import('views/payment-management/payments-page')));

//Institute Management
const InstitutesPage = Loadable(lazy(() => import('views/institute-management/institutes-overview-page')));
const InstituteProfile = Loadable(lazy(() => import('views/institute-management/institute[id]-page')));
const AddNewInstitutesPage = Loadable(lazy(() => import('views/institute-management/institute-add-page')));

const HelpsPage = Loadable(lazy(() => import('views/help-center/helps')));
const TicketsPage = Loadable(lazy(() => import('views/help-center/tickets')));
const ChatSupport = Loadable(lazy(() => import('views/help-center/chat-support')));

//SubscriptionManagement
const Subscription = Loadable(lazy(() => import('views/subscription-management/plans-and-features')));

// Tax Management
const TaxesPage = Loadable(lazy(() => import('views/tax-management/taxes')));

// Discount Management
const DiscountsPage = Loadable(lazy(() => import('views/discount-management/discounts')));

// Notification Management
const NotificationsPage = Loadable(lazy(() => import('views/notification-management/notifications')));

//Error Pages
const Page404 = Loadable(lazy(() => import('views/error-pages/404-page')));
const Page401 = Loadable(lazy(() => import('views/error-pages/401-page')));
const Page500 = Loadable(lazy(() => import('views/error-pages/500-page')));

// Account
const AccountSettings = Loadable(lazy(() => import('layout/MainLayout/Header/ProfileSection/AccountSettings')));

//Institute User Management
const InstituteGroupsOverviewPage = Loadable(
  lazy(() => import('views/institute-management/institute[id]-page/user-management/groups-page/groups-overview-page'))
);
const InstituteGroupsAddPage = Loadable(
  lazy(() => import('views/institute-management/institute[id]-page/user-management/groups-page/groups-add-page'))
);
const InstituteGroupsEditPage = Loadable(
  lazy(() => import('views/institute-management/institute[id]-page/user-management/groups-page/groups-edit-page'))
);
const InstituteGroupsViewPage = Loadable(
  lazy(() => import('views/institute-management/institute[id]-page/user-management/groups-page/groups[id]-page'))
);
const InstituteAdminUserOverviewPage = Loadable(
  lazy(() => import('views/institute-management/institute[id]-page/user-management/users-page/users-overview-page'))
);
const InstituteAdminUserViewPage = Loadable(
  lazy(() => import('views/institute-management/institute[id]-page/user-management/users-page/users[id]-page'))
);
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const Protected = () => {
  // Access the isAuthenticated state from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If the user is authenticated, render the content
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }
};
const AdminRoute = () => {
  const isAdmin = useSelector((state) => state.auth.userData?.is_admin);

  if (isAdmin === '1') {
    return <Outlet />;
  }
  return <Navigate to="/un-authorized" />;
};

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardDefault />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/user-management" element={<MainLayout />}>
            <Route index element={<Navigate to="/user-management/groups" />} />
            <Route path="groups" element={<GroupsPage />} />
            <Route path="groups/add" element={<AddGroupPage />} />
            <Route path="groups/view" element={<ViewGroupPage />} />
            <Route path="groups/edit/:id" element={<EditGroupPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<ViewUserPage />} />
          </Route>
        </Route>

        {/* PaymentManagement */}
        <Route path="/payment-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/payment-management/payments" />} />
          <Route path="payments" element={<Payments />} />
        </Route>
        {/* Profile */}
        <Route path="/profile-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/account-settings" />} />
          <Route path="account-settings" element={<AccountSettings />} />
        </Route>

        <Route path="/institute-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/institute-management/institutes" />} />
          <Route path="institutes" element={<InstitutesPage />} />
          <Route path="institutes/profile/:id" element={<InstituteProfile />} />
          <Route path="institutes/add" element={<AddNewInstitutesPage />} />
        </Route>

        {/* SubscriptionManagement */}
        <Route path="/subscription-management" element={<MainLayout />}>
          <Route path="plans-and-features" element={<Subscription />} />
        </Route>

        {/* </ Tax Route> */}
        <Route path="/tax-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/tax-management/taxes" />} />
          <Route path="taxes" element={<TaxesPage />} />
        </Route>

        {/* Discount Route */}
        <Route path="/discount-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/discount-management/discounts" />} />
          <Route path="discounts" element={<DiscountsPage />} />
        </Route>

        {/* Notification Route */}
        <Route path="/notification-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/notification-management/notifications" />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
        <Route path="/help-center" element={<MainLayout />}>
          <Route index element={<Navigate to="/help-center/helps" />} />
          <Route path="helps" element={<HelpsPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="chatSupport" element={<ChatSupport />} />
        </Route>

        <Route element={<MinimalLayout />}>
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route element={<MinimalLayout />}>
          <Route path="/server-error" element={<Page500 />} />
        </Route>
        {/* <Route element={<MinimalLayout />}>
          <Route path="/login" element={<Navigate to="/" />} />
        </Route> */}
        <Route path="/:id/user-management" element={<InstituteMainLayout />}>
          <Route index element={<Navigate to="/:id/user-management/groups" />} />
          <Route path="groups" element={<InstituteGroupsOverviewPage />} />
          <Route path="groups/add" element={<InstituteGroupsAddPage />} />
          <Route path="groups/edit/:id" element={<InstituteGroupsEditPage />} />
          <Route path="groups/:id" element={<InstituteGroupsViewPage />} />
          <Route path="users" element={<InstituteAdminUserOverviewPage />} />
          <Route path="users/:id" element={<InstituteAdminUserViewPage />} />
        </Route>
      </Route>

      <Route element={<MinimalLayout />}>
        <Route path="/login" element={<AuthLogin />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="/un-authorized" element={<Page401 />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="/server-error" element={<Page500 />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;

import AdminStat from "../../components/Dashboard/Stat/AdminStat";
import UserStat from "../../components/Dashboard/Stat/UserStat";
import PageHeading from "../../components/Shared/Utilities/PageHeading";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Statistics = () => {
  const { dbUser } = useAuth();
  const [role] = useRole();
  return (
    <div>
      <title>Dashboard | Pathway</title>
      <PageHeading
        heading={`Welcome To Dashboard, ${dbUser?.displayName}`}
        text={"Manage your journey to love with ease"}
      />
      {role?.role === "Admin" && role?.isAdmin ? (
        <AdminRoute>
          <AdminStat />
        </AdminRoute>
      ) : (
        <UserStat />
      )}
    </div>
  );
};
export default Statistics;

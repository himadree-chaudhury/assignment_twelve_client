import AdminStat from "../../components/Dashboard/Stat/AdminStat";
import UserStat from "../../components/Dashboard/Stat/UserStat";
import PageHeading from "../../components/Shared/Utilities/PageHeading";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Statistics = () => {
  const { user } = useAuth();
  const [role, isAdmin] = useRole();
  return (
    <div>
      <title>Dashboard | Pathway</title>
      <PageHeading
        heading={`Welcome To Dashboard, ${user?.displayName}`}
        text={"Manage your journey to love with ease"}
      />
      {role === "Admin" && isAdmin && <AdminStat />}
      {role === "User" && !isAdmin && <UserStat />}
    </div>
  );
};
export default Statistics;

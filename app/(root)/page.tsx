import Dashboard from "@/components/DashBoard";
import HeaderBox from "@/components/HeaderBox";
;

export default function Home() {
  const loggedIn = {firstName:"Rubix"}
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and Manage Your Business Resources Efficiently"
          />
          <Dashboard/>
        </header>
      </div>
    </section>
  );
}

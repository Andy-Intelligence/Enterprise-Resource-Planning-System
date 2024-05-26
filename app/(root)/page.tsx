import HeaderBox from "@/components/HeaderBox";
;

export default function Home() {
  const loggedIn = {firstName:"Andy"}
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and Manage Your Account Transactions and Transactions Efficiently"
          />
          
        </header>
      </div>
    </section>
  );
}

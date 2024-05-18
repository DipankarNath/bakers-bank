import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import {getLoggedInUser} from "@/lib/actions/user.actions";

const HomePage: React.FC = async () => {
    const loggedIn = await getLoggedInUser();
    console.log('loggedIn', loggedIn);
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.name || "Guest"}
                        subtext="access and manage your account and transactions efficiently"
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.5}
                    />
                </header>
            </div>
            <RightSidebar user={loggedIn} transactions={[]}
                          banks={[{currentBalance: 1345.50}, {currentBalance: 444.44}]}/>
        </section>
    );
};

export default HomePage;

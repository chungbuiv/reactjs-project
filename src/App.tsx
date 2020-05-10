import { Layout } from 'antd';
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Home } from './components/home/home';
import CreateTransaction from './components/transaction/create-transaction';
import EditTransaction from './components/transaction/edit-transaction';
import { UserProfile } from './components/user-profile/user-profile';


const { Header, Footer, Sider, Content } = Layout;

const EditProfile = React.lazy(() => import('./components/user-profile/edit-profile'));

export default function App() {

  return (
    <Router>
      <div>

        <Layout>
          <Header className="header" style={{ background: '#fff' }}>
            <div className="logo" />

          </Header>
          <Layout>

            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 580,
                }}
              >
                <Switch>
                  <Route path="/" exact={true}>
                    <Home></Home>
                  </Route>
                  <Route path="/edit-profile">
                    <Suspense fallback={<div>Loading...</div>}>
                      <EditProfile />
                    </Suspense>
                  </Route>
                  <Route path="/transactions/:id" render={(props) => <EditTransaction {...props} />}></Route>
                  <Route path="/create-transaction">
                    <Suspense fallback={<div>Loading...</div>}>
                      <CreateTransaction />
                    </Suspense>
                  </Route>
                </Switch>
              </Content>
            </Layout>

            <Sider width={300} className="site-layout-background" style={{ background: '#fff' }}>
              <UserProfile />
            </Sider>
          </Layout>
        </Layout>
      </div>
    </Router>

  );
}

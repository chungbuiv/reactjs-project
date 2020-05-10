import { Layout } from 'antd';
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Home } from './components/home/home';
import EditTransaction from './components/transaction/edit-transaction';
import { UserProfile } from './components/user-profile/user-profile';
const EditProfile = React.lazy(() => import('./components/user-profile/edit-profile'));
const CreateTransaction = React.lazy(() => import('./components/transaction/create-transaction'));

const { Header, Footer, Sider, Content } = Layout;

export default function App() {

  return (
    <Router>
      <div>

        <Layout>
          <Header className="header" style={{ background: '#fff', height: '44px' }}>
            <div className="logo" />

          </Header>
          <Layout style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'rgb(239, 243, 247)' }}>

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
          {/* <Footer>EXPAND TABLE</Footer> */}
        </Layout>
      </div>
    </Router>

  );
}

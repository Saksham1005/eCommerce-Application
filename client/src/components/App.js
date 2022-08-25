import "../App.scss";
import "../css/Navbar.css";
import Bottom_App_Design from "./Bottom_App_Design";

import {
  Navbar,
  Page404,
  Login,
  SignUp,
  Products,
  Add_product,
  Profile,
} from "./index";

import { Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";

// const app = () => {
//   return <h1>App</h1>;
// };

// const setting = () => {
//   return <h1>Setting</h1>;
// };

// const Links = () => {
//   return (
//     <div className="m-6 Links">
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//         <li>
//           <Link to="/signUp">Sign Up</Link>
//         </li>
//         <li>
//           <Link to="/setting">Setting</Link>
//         </li>
//       </ul>

//       <Switch>
//         <Route exact path="/" component={app} />

//         <Route path="/login" component={Login} />

//         <Route path="/signUp" component={SignUp} />

//         <Route path="/setting" component={setting} />

//         <Route component={Page404} />
//       </Switch>
//     </div>
//   );
// };

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path="/" component={Products} />

        <Route path="/login" component={Login} />

        <Route path="/signUp" component={SignUp} />

        <Route path="/add_product" component={Add_product} />

        <Route path="/profile" component={Profile} />

        <Route component={Page404} />
      </Switch>
      <Bottom_App_Design />
    </div>
  );
}

const mapStateToProps = () => {};

// export default connect(mapStateToProps)(App);
export default App;

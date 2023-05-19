// after run : npm install react-router-dom
{/* 
We have multiple kinds of ready-made components that we use to navigate through multiple pages in the same application.
these components are [ BroweserRouter, Routes, Route, Link, NavLink, useNavigate, NotFound, Outlet].
let's discover what every component can do :
1- <BrowserRouter> </BrowserRouter> will wrap around all <App /> to enable navigate through different pages.
2- <Routes> </Routes> will wrap all <Route /> components that lead to every page (home, about, contact, .....).
3- <Route path="/" element={<Home />} /> is a component that hold page path and page component.
4- <Link to="/" > Home </Link> || <NavLink to="/" className="active" > Home </NavLink>
    these both are like <a href="/"> , but the main difference is that NavLink has className="active" which
    can be used in CSS for marking active page link.
5- First, we can use useNavigate() hook to navigate from the submit page to the main page after submitting.
    For example, if you've filled up application and press (submit) button, the application will be send to 
    the server and you will be re-directed to Home Page, this redirection is made by using useNavigate().
    look below for example-one. Note that "home" in redirected_to("home") is from URL or the same as URL.
    https://www.github.com/contact-us >>>> redirected_to("contact-us").
6- <NotFound /> is a component for a page that will redirect the user to a standard error message when they
    try to navigate to not found URL. For example, if there is no page with link "products" in the URL and you've
    tried to go to "https://www.github.com/products", path="*" will redirected you to "this page is not found".

    <Route path="*" element={<NotFound />} />
7- Nested routes or <Outlet /> is more like <%= Yield %> in application.html.erb in Rails. It will include all
    sub-pages inside the main page, for example if we have Engineering Department page which includes sub-pages
    of Civil-Department, Mechanical-Department, and Electrical-Department; we can use <Outlet /> to include 
    these sub-pages inside the main page. See example-two for more details.

 */}}


    {/* example-one */}

    import {useNavigate} from "react-router-dom";

    function fillInApplication() {

        const redirected_to = useNavigate() ;

        return ( 
            <form>
                <input type="text" />
                <submit type="button" onClick={() => redirected_to("home")} />
            </form>
        )

    }
    export default fillInpApplication;

    {/* example-two */}

    import {NavLink, Outlet} from "react-router-dom";

    function EngineeringDep() {

        return (

            <div className="EngineeringDep" >
                {/* note that we use "civil-dep" directly without "/" */}
                <nav>
                    <NavLink to="civil-dep"> Civil Department</NavLink>
                    <NavLink to="mech-dep"> Mechanical Department</NavLink>
                </nav>

                <Outlet />
            </div>

            )

    }
    export default EngineeringDep;

    {/* main example */}

    import NotFound from "./Components/NotFound";
    import fillInApplication from "./Components/fillInApplication";
    import EngineeringDep from "./Components/EngineeringDep";
    import CivilDep from "./Components/CivilDep";
    import MechDep from "./Components/MechDep";

    function app() {

        return (

            <BrowserRouter>
                <div className="App">
                    <nav>
                        <NavLink to="/"> Home </NavLin>
                        <NavLink to="/contact"> contact-us </NavLin>
                        <NavLink to="/eng-dep"> Engineering Departments </NavLin>
                        <NavLink to="/fill-in"> Vacancy Application </NavLin>
                    </nav>

                    <Routes>

                        <Route path="/contact" element={<Contact />} />
                        <Route path="/fill-in" element={<fillInApplication />} />
                    {/* eng-dep route is a nested route, note that we write civil-dep without "/" because we need to navigate to
                        localhost:3000/eng-dep/civil-dep NOT localhost:3000/civil-dep directly.
                     */}
                        <Route path="/eng-dep" element={<EngineeringDep />}>
                            <Route path="civil-dep" element={<CivilDep />} />
                            <Route path="mech-dep" element={<MechDep />} />
                        </Route>
                    {/* we can add last route as NotFound */}
                        <Route path="*" element={<NotFound />} />

                    </Routes>   

                </div>
            </BrowserRouter>

            )
    }

    export default App;



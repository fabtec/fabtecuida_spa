import React, { Component } from 'react';

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

class AppContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      isSidebarOpen: true
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  }

  render() {
    const { children } = this.props;
    const {
      isSidebarOpen,
    } = this.state;
    const {
      toggleSidebar,
    } = this;

    return (
      <Provider
        value={{
          // values
          isSidebarOpen,
          // callbacks
          toggleSidebar,
        }}
      >
        { children }
      </Provider>
    );
  }
}

export default AppContextProvider;
export { AppContext, Consumer };
import React from 'react';
import Link from '../../components/link';
import styles from './index.module.css';
import logo from '../../images/logo.png';
import getNavigation from '../../helpers/navigation-list';
import Dropdown from './dropdown/index';
import { Router, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  links = getNavigation();

  onHome = () => {
    this.props.history.push('/home');
  };

  render() {
    return (
      <section className={styles.navigation}>
        <img
          src={logo}
          alt='Logo'
          className={styles.siteTitle}
          onClick={this.onHome}
        />

        <nav>
          <ul>
            {this.links.map((navElement, index) => {
              if (navElement.dropdown) {
                return (
                  <li key={index}>
                    <div className={styles.dropdown}>
                      <span className={styles.wrapperProgram}>
                        <Link
                          key={navElement.title}
                          href={navElement.link}
                          title={navElement.title}
                        />
                      </span>
                      <div className={styles.dropdownContent}>
                        <Dropdown list={navElement.dropdown} />
                      </div>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    <Link
                      key={navElement.title}
                      href={navElement.link}
                      title={navElement.title}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </section>
    );
  }
}

export default withRouter(Header);

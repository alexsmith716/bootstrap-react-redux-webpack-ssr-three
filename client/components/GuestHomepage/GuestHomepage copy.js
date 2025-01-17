import React from 'react';
//import PortfolioBox from '../PortfolioBox/PortfolioBox';
//import ServiceBox from '../ServiceBox/ServiceBox';
import GuestHomepageScss from './GuestHomepage.scss';

const GuestHomepage = () => {

  return (
    <div>
      <main role="main">

        <div className={`jumbotron ${GuestHomepageScss.masthead} d-flex`}>
          <div className="container">
            <h1 className="display-3">Isomorphic App!</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
          </div>
        </div>

        <div className="container">

          <div className="row">
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
              <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
              <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
              <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
            </div>
          </div>

          <hr/>

        </div>

      </main>
    </div>
  );
};

export default GuestHomepage;

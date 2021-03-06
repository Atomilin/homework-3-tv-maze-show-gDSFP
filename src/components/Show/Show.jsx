import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getShowInfo } from '../../api';

export default class Show extends PureComponent {
  static propTypes = {
    showId: PropTypes.string
  };

  state = {
    showId: '',
    data: '',
  };

  static checkIsSameShow = ({showId: firstShowId}, { showId: secondShowId }) => {
    return firstShowId === secondShowId;
  }

  static getDerivedStateFromProps = (props, state) => {
    if(Show.checkIsSameShow(props, state)) return null;

    return {
        showId: props.showId,
        data: null
    };
  }

  fetchShow = async () => {
    const data = await getShowInfo(this.state.showId);

    this.setState({
        data: data
    });
  }

  componentDidUpdate(prevState) {
    if (Show.checkIsSameShow(prevState, this.state)) return;

    this.fetchShow();
  }

  renderStub = () => {
    return <p className="show-inforation t-show-info">Шоу не выбрано</p>;
  };

  renderShowCard = () => {
    const {
        image, 
        name,
        genres,
        summary
    } = this.state.data;

    return (
      <div className="show">
        <img
          className="show-image"
          src={image.medium}
          alt={name}
        />

        <h2 className="show-label t-show-name">{name}</h2>

        <p className="show-text t-show-genre">
          <b>Жанр: </b>{genres.join(', ')}
        </p>

        <p className="show-text t-show-summary" dangerouslySetInnerHTML={{__html: summary}} />
      </div>
    );
  };

  render() {
    const { data } = this.state;

    return (<div>
        {!data && this.renderStub()}
        {data && this.renderShowCard()}
    </div>);
  }
}
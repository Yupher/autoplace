import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { NavLink } from 'react-router-dom';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape } from 'react-intl';
import suggestionsApi from 'enl-api/ui/menu';
import messages from '../Header/messages';
import styles from './search-jss';

// v1 
import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { setSearchUsers, setSearchBlockedUsers } from '../../redux/actions/infoActions'
import { setSearchVehCats, setSearchVehFams } from '../../redux/actions/infoVehActions'

const menu = [];

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;


  return (
    <TextField
      className={classes.inputHeader}
      fullWidth
      InputProps={{
        inputRef: ref,
        ...other,
      }}
    />
  );
}



function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <MenuItem button selected={isHighlighted} component={NavLink} to={suggestion.link}>
      <div>
        {parts.map((part, index) => (
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        ))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps}>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0 ? [] : menu.filter(suggestion => {
    const keep = (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

const SearchUi = (props) => {
  const { classes, intl, history, setSearchUsers, setSearchBlockedUsers, setSearchVehCats, setSearchVehFams } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [path, setPath] = useState(window.location.pathname);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setInputValue(newValue);
  };

  const handleSuggestionSelected = (event, { suggestion, method }) => {
    if (method === 'enter') {
      history.push(suggestion.link);
    }
  };

  useEffect(() => {
    suggestionsApi.map(item => {
      if (item.child) {
        item.child.map(itemChild => {
          if (itemChild.link) {
            menu.push(itemChild);
          }
          return menu;
        });
      }
      return false;
    });
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setPath(window.location.pathname);
    }, 1);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setInputValue('');
    setSearchUsers('');
    setSearchBlockedUsers('');
    setSearchVehCats('');
    setSearchVehFams('')
  }, [path]);


  // call actions functions
  useEffect(() => {
    switch (path) {
      case '/app/pages/users':
        setSearchUsers(inputValue)
        break;

      case '/app/pages/blocked':
        setSearchBlockedUsers(inputValue)
        break;

      case '/app/pages/vehicles':
        setSearchVehCats(inputValue)
        break;
      case '/app/pages/families':
        setSearchVehFams(inputValue)
        break;

      default:
        break;
    }
  }, [inputValue]);


  return (
    <Autosuggest
      theme={{
        container: classes.containerSearch,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={handleSuggestionSelected}
      renderSuggestion={renderSuggestion}
      className={classes.autocomplete}
      inputProps={{
        classes,
        placeholder: intl.formatMessage(messages.search),
        value: inputValue,
        onChange: handleChange,
        path,
        setSearchUsers
      }}
    />
  );
}

SearchUi.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  setSearchUsers: PropTypes.func.isRequired,
  setSearchBlockedUsers: PropTypes.func.isRequired,
  setSearchVehCats: PropTypes.func.isRequired,
};


const SearchUiReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(SearchUi);


const mapDispatchToProps = { setSearchUsers, setSearchBlockedUsers, setSearchVehCats, setSearchVehFams };



const mapStateToProps = state => ({
  ...state,
});

const SearchUiMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUiReduxed);



export default withStyles(styles)(injectIntl(SearchUiMapped));

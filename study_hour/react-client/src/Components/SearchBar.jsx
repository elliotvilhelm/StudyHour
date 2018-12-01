import React, {Component} from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import axios from "axios";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { withStyles } from '@material-ui/core/styles';
import * as SearchBar_action from "../actions/SearchBar_action";
import { connect } from  "react-redux";
import Button from "@material-ui/core/Button/Button";
import * as signup_actions from "../actions/signup_action";

let suggestionList = [];

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
        <MenuItem selected={isHighlighted} component="div" onClick={this.handleClick} >
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestionList.filter(suggestion => {
            const keep =
                count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

const styles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
});

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            single: '',
            suggestions: [],
        };
        this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
        this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount (){
        axios({
            method: 'get',
            url: '/api/SearchBar',
            config: { headers: {'Content-Type': 'multipart/form-data' }}

        }).then(response => {
            console.log("response", response.data.dbresponse);
            this.setState({suggestions: response.data.dbresponse});
            suggestionList = this.state.suggestions;

            console.log(suggestionList);
        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }

    handleSuggestionsFetchRequested ({ value }) {
        this.setState({suggestions: getSuggestions(value)});
    };

    handleSuggestionsClearRequested () {
        this.setState({suggestions: []});
    };

    handleChange (event) {
        if (event.target.value === undefined) {
            event.target.value = "";
        }
        this.setState({...this.state, single: event.target.value});
    };

    handleClick (event) {
        // console.log(this.state.suggestions.filter(suggestion => suggestion.name == event.target.innerText)[0]);
        this.props.dispatch(SearchBar_action.search(this.state.suggestions.filter(suggestion =>
            suggestion.name.toLowerCase() + "\n" === (event.target.innerText).toLowerCase())[0])
        );
    };

    handleSearch () {
        this.props.dispatch(SearchBar_action.listResult(this.state.single));
    };

    render() {
        const { classes } = this.props;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion: renderSuggestion.bind(this),
        };

        return (
            <div className={classes.root}>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                    placeholder: 'Search a Location',
                    value: this.state.single,
                    onChange: this.handleChange,
                    }}
                    theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                    )}
                />
                <Button id="submit-button"
                        variant="contained"
                        className={classes.button}
                        onClick={this.handleSearch}>
                    HIT IT!
                </Button>
            </div>
        )
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(SearchBar));
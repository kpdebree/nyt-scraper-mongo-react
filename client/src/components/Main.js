import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/API";

class Main extends Component {

	state = {
		topic: "",
		startYear: "",
		endYear: "",
		articles: [],
		saved: []
	};

	componentDidMount() {
		this.getSavedArticles()
	};

	getSavedArticles = () => {
		API.getArticles()
		.then((res) => {
			this.setState({ saved: res.data});
		});
	}

	renderArticles = () => {
		return this.state.articles.map(article => (
		<Results
			_id={article._id}
			key={article._id}
			title={article.headline.main}
			pub_date={article.pub_date}
			snippet={article.snippet}
			url={article.web_url}
			handleSaveButton={this.handleSaveButton}
			getSavedArticles={this.getSavedArticles}
		/>
		));
	}

	renderSaved = () => {
		return this.state.saved.map(save => (
		<Results
			_id={save._id}
			key={save._id}
			title={save.headline.main}
			pub_date={save.pub_date}
			snippet={save.snippet}
			url={save.web_url}
			handleDeleteButton={this.handleDeleteButton}
			getSavedArticles={this.getSavedArticles}
		/>
		));
	}

	handleTopicChange = (event) => {
		this.setState({ topic: event.target.value });
	}

	handleStartYearChange = (event) => {
		this.setState({ startYear: event.target.value });		
	}

	handleEndYearChange = (event) => {
		this.setState({ endYear: event.target.value });
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		console.log("Getting NYT Articles");
    	console.log("this.state.topic: ", this.state.topic);
    	console.log("this.state.startYear: ", this.state.startYear);
	    console.log("this.state.endYear: ", this.state.endYear);
		API.nytSearch(this.state.topic, this.state.startYear, this.state.endYear)
			.then((res) => {
				this.setState({ articles: res.data.response.docs });
				console.log("this.state.articles: ", this.state.articles);
		});		
	}

	handleSaveButton = (id) => {
		const findArticleByID = this.state.articles.find((el) => el._id === id);
		console.log("findArticleByID: ", findArticleByID);
		console.log(findArticleByID.byline.original)
		const newSave = {title: findArticleByID.headline.main, author: findArticleByID.byline.original, pub_date: findArticleByID.pub_date, snippet: findArticleByID.snippet, url: findArticleByID.web_url};
		API.saveArticles(newSave)
			.then(this.getSavedArticles());
	}

	handleDeleteButton = (id) => {
		API.deleteArticle(id)
			.then(this.getSavedArticles());
	}

	render() {
		return (

			<div className="main-container">
				<div className="container">
				{/* Jumbotron */}
				<div className="jumbotron">
				  <h1 className="text-center"><strong>NYT Article Searching Tool</strong></h1>
				</div>
				{/* Search Form and Results Section */}
				<Search
					handleTopicChange={this.handleTopicChange}
					handleStartYearChange={this.handleStartYearChange}
					handleEndYearChange={this.handleEndYearChange}
					handleFormSubmit={this.handleFormSubmit}
					renderArticles={this.renderArticles}
				/>
				{/* Saved Articles Section */}
				<div className="container">
		          <div className="container">
		            <div className="row">
		              <div className="col-lg-12">
		                <div className="panel panel-primary">
		                  <div className="panel-heading">
		                    <h3 className="panel-title">
		                      <strong>
		                        <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
		                    </h3>
		                  </div>
		                  <div className="panel-body">
		                    <ul className="list-group">
		                      {this.renderSaved()}
		                    </ul>
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>
		    	</div>
      		</div>
      	</div>
		);
	}

}

export default Main;
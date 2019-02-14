import React, { Component } from 'react'
import SearchManager from '../../modules/SearchManager'
import ResetRating from '../Rating/RatingSystem'
export default class EditLanguageCard extends Component{
  state={
    languageId:"",
    notes:"",
    flagPhotoURL:"",
    rate:"",
    userId:Number(sessionStorage.getItem("username")),
    languages:[]
  }
  handleFieldChange= evt =>{
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  handleRatingChange = (rating) => {
    this.setState({rate:rating})
    
  }

  buildLanguageOptions(){
    let languages = []
    SearchManager.getAllLanguages()
    .then(allLanguages => {
      allLanguages.forEach(language => {
        if(!languages.includes({id: language.id, language: language.language})){
          languages.push({id: language.id, language: language.language})
        }
      })
      this.setState({languages:languages})
    })
  }
  componentDidMount(){
    this.buildLanguageOptions()
  }
  updateExistingCard = evt => {
    evt.preventDefault()

    const existingCard = {
      languageId: parseInt(this.state.languageId),
      notes:this.state.notes,
      flagPhotoURL:this.state.flagPhotoURL,
      rate:this.state.rate,
      userId:this.state.userId
    }
    this.props.editCard(Number(this.props.match.params.id), existingCard)
    .then(() => this.props.history.push("/profile"))
  }


  render(){
    return(
      <form className="editProfile">
        <div className="form-row">
          <div className="form-group col-md-6">
          <label htmlFor="lng">Select a language: </label>
          <select 
                  className="form-control"
                  type="select-multiple"
                  onChange={this.handleFieldChange}
                  id="languageId"
                  placeholder="Select a language">
                  <option key={0} defaultValue="">English</option>
                  {
                    this.state.languages.map(language => (
                      <option key={language.id} value={language.id}>{language.language}</option>
                    ))
                    
                  }
                  
          </select>
        </div>
        <div className="form-group col-md-6">
        <label htmlFor="email">Flag Photo: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="flagPhotoURL"
                  // value={this.props.input.flagPhotoURL}
                  placeholder="Email" />
        </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Notes: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="notes"
                  value={this.props.notes}
                  placeholder="Notes..." />
        </div>
        <div className="form-group">
          
          <label htmlFor="rate">Proficiency:</label>
          <ResetRating 
            // value={this.props.input.rate}
            id="rating"
            onChange={this.handleRatingChange}
            />
          </div>
      <button type="button" onClick={this.updateExistingCard}>Update</button>
      </form>
    )
  }
}
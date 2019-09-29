import React from "react";
import {floor} from "lodash";

import PropTypes from 'prop-types';

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  getStartingPage(currentPage, totalPages, maxPageDisplayed) {
    const half = floor(maxPageDisplayed / 2)
    if (currentPage <= half) {
      return 1
    } else if (currentPage >= totalPages - half) {
      const startPage = totalPages - maxPageDisplayed + 1
      return startPage > 1 ? startPage : 1
    }
    return currentPage - half
  }

  handleChangePage(event) {
    event.preventDefault()
    const pageNumber = event.target.dataset.page
    this.props.handleChangePage(pageNumber)
  }

  render() {
    if (!this.props.total) return <div></div>
    const hasPrevious = this.props.offset > 0
    const hasNext = this.props.offset + this.props.limit < this.props.total
    const currentPage = this.props.offset / this.props.limit + 1
    const totalPages = parseInt(this.props.total / this.props.limit) + (this.props.total % this.props.limit > 0 ? 1 : 0)
    const maxPageDisplayed = 5
    const startingPage = this.getStartingPage(currentPage, totalPages, maxPageDisplayed)

    const pages = []

    for (let pageNumber = startingPage; pages.length < maxPageDisplayed && pageNumber <= totalPages; pageNumber++) {
      const isCurrentPage = currentPage === pageNumber
      const pageLink = <li
        key={`page${pageNumber}`} className={`page-item${isCurrentPage ? ' active' : ''}${this.props.isFetching ? ' disabled' : ''}`}><a
        data-page={pageNumber} className="page-link" href="#" onClick={this.handleChangePage}>{pageNumber}</a></li>
      pages.push(pageLink)
    }
    return <nav aria-label="Page navigation example" className="mb-2 mt-2">
      <ul className="pagination mb-0">
        <li className={`page-item${!this.props.isFetching && hasPrevious ? '' : ' disabled'}`}>
          <a className="page-link" href="#" onClick={this.props.handlePrevious}>Précédent</a>
        </li>
        {pages}
        <li className={`page-item${!this.props.isFetching && hasNext ? '' : ' disabled'}`}>
          <a className="page-link" href="#" onClick={this.props.handleNext}>Suivant</a>
        </li>
        {this.props.isFetching && <li>
          <div className="spinner-border" style={{marginLeft: '10px', width: '40px', height: '40px'}} role="status">
            <span className="sr-only">Chargement...</span>
          </div>
        </li>}
      </ul>
      <div className="p-2">Page {currentPage} de {totalPages}</div>
    </nav>
  }
}

Pagination.propTypes = {
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
}

export default Pagination

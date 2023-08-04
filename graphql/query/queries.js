import {gql} from "apollo-boost";

export const GET_INDUSTRIES = gql`
query GET_INDUSTRIES {
  industries(filters: {}, pagination: {}, sort: [], publicationState: LIVE) {
    data {
      id
      attributes {
        title
        overview
        link
        image
      }
    }
  }
}
`

export const GET_INDUSTRY_BY_ID = gql`
query GET_INDUSTRIES_BY_ID($id : ID!) {
  industries(filters: { id: { eq: $id } }, publicationState: LIVE) {
    data {
      id
      attributes {
        title
        overview
        link
        image
      }
    }
  }
}
`

export const CREATE_INDUSTRY = gql`
mutation CREATE_INDUSTRY(
  $title: String
  $overview: String
  $industry_piller: [ID]
  $publish: DateTime
  $image: JSON
) {
  createIndustry(
    data: {
      title: $title
      overview: $overview
      industry_pillers: $industry_piller
      publishedAt: $publish
      image: $image
    }
  ) {
    data {
      id
    }
  }
}
`

export const CREATE_INDUSTRY_PILLER = gql`
mutation CREATE_INDUSTRY_PILLER(
  $title: String
  $overview: String
  $industry_id: ID
  $learn_more_link: String
  $publish: DateTime
) {
  createIndustryPiller(
    data: {
      industry: $industry_id
      title: $title
      overview: $overview
      overview_link: $learn_more_link
      publishedAt: $publish
    }
  ) {
    data {
      id
    }
  }
}
`

export const CREATE_INDUSTRY_USECASES = gql`
mutation CREATE_INDSUTRY_USECASES(
  $usecaseTitle: String
  $industryPillarId: ID
  $decisionMakers: JSON
  $decisionMakersFactors: JSON
  $desiredBusinessObjectives: JSON
  $customerPainPoints: JSON
  $proposedTechnicalSolution: JSON
  $otherNotableAttributes: JSON
  $products: JSON
  $industryName: String
  $geography: String
  $marketCap: String
  $employees: String
  $budget: String
  $imageLink: String
  $imageSubtitle: String
  $publish: DateTime
) {
  createUsecase(
    data: {
      title: $usecaseTitle
      industry_piller: $industryPillarId
      key_highlights: {
        decision_makers: $decisionMakers
        decision_making_factors: $decisionMakersFactors
        desired_business_objectives: $desiredBusinessObjectives
        customer_pain_points: $customerPainPoints
        proposed_technical_solution: $proposedTechnicalSolution
        other_notable_attributes: $otherNotableAttributes
        products: $products
      }
      ideal_customer_profile: {
        industries: $industryName
        geography: $geography
        market_cap: $marketCap
        employees: $employees
        budget: $budget
        image_link: $imageLink
        image_subtitle: $imageSubtitle
      }
      publishedAt: $publish
    }
  ) {
    data {
      id
    }
  }
}
`

export const GET_INDSUTRIES_PILLERS = gql`
query GET_INDUSTRIES_PILLER {
  industryPillers(
    filters: {}
    pagination: {}
    sort: []
    publicationState: LIVE
  ) {
    data {
      id
      attributes {
        title
        industry {
          data {
            attributes {
              title
            }
          }
        }
      }
    }
  }
}
`

export const GET_INDUSTRY_PILLERS = gql`
query GET_INDUSTRY_PILLERS {
  industryPillers(
    filters: {}
    pagination: {}
    sort: []
    publicationState: LIVE
  ) {
    data {
      id
    }
  }
}
`

export const GET_INDUSTRY_PILLER_BY_ID  = gql`
query GET_INDUSTRY_PILLER_BY_ID($id: ID!) {
  industryPiller(id: $id) {
    data {
      id
      attributes {
        title
        overview
        overview_link
        industry {
          data {
            id
          }
        }
      }
    }
  }
}
`


export const GET_INDUSTRY_USECASES = gql`
query GET_INDUSTRY_USECASES {
  usecases(filters: {}, pagination: {}, sort: [], publicationState: LIVE) {
    data {
      id
    }
  }
}

`

export const GET_INDUSTRY_USECASE_BY_ID  = gql`
query GET_INDUSTRY_USECASE_BY_ID ($id: ID!){
  usecase(id: $id) {
    data {
      id
      attributes {
        title
      }
    }
  }
}
`


export const UPDATE_INDUSTRY = gql`
mutation UpdateIndsutry($id : ID!, $title : String, $overview : String, $image: JSON) {
  updateIndustry(id: $id, data: {
    title : $title
    overview : $overview 
    image: $image
  }) {
    data {
      id
    }
  }
}
`
export const UPDATE_INDUSTRY_PILLER = gql`
mutation UPDATE_INDUSTRY_PILLER(
  $id: ID!
  $title: String
  $overview: String
  $link: String
  $industry_id: ID
) {
  updateIndustryPiller(
    id: $id
    data: {
      overview: $overview
      title: $title
      overview_link: $link
      industry: $industry_id
    }
  ) {
    data {
      id
    }
  }
}
`

// todo :: GET_INDUSTRY_USECASES_BY_ID
export const  GET_INDUSTRY_USECASES_FULL_BY_ID = gql`
query GET_INDUSTRY_USECASES_FULL_BY_ID($id: ID!) {
  usecase(id: $id) {
    data {
      id
      attributes {
        title
        link
        industry_piller {
          data {
            id
            attributes {
              title
              industry {
                data {
                  attributes {
                    title
                  }
                }
              }
            }
          }
        }
        key_highlights {
          id
          decision_makers
          decision_making_factors
          desired_business_objectives
          customer_pain_points
          proposed_technical_solution
          other_notable_attributes
          products
        }
        ideal_customer_profile {
          id
          industries
          geography
          market_cap
          employees
          budget
          image_link
          image_subtitle
        }
      }
    }
  }
}

`


// todo :: UPDATE_INDUSTRY_USECASES
export const  UPDATE_INDUSTRY_USECASES = gql`
mutation UPDATE_INDUSTRY_USECASES(
  $id: ID!
  $usecaseTitle: String
  $industryPillarId: ID
  $decisionMakers: JSON
  $decisionMakersFactors: JSON
  $desiredBusinessObjectives: JSON
  $customerPainPoints: JSON
  $proposedTechnicalSolution: JSON
  $otherNotableAttributes: JSON
  $products: JSON
  $industryName: String
  $geography: String
  $marketCap: String
  $employees: String
  $budget: String
  $imageLink: String
  $imageSubtitle: String
  $publish: DateTime
) {
  updateUsecase(
    id: $id
    data: {
      title: $usecaseTitle
      industry_piller: $industryPillarId
      key_highlights: {
        decision_makers: $decisionMakers
        decision_making_factors: $decisionMakersFactors
        desired_business_objectives: $desiredBusinessObjectives
        customer_pain_points: $customerPainPoints
        proposed_technical_solution: $proposedTechnicalSolution
        other_notable_attributes: $otherNotableAttributes
        products: $products
      }
      ideal_customer_profile: {
        industries: $industryName
        geography: $geography
        market_cap: $marketCap
        employees: $employees
        budget: $budget
        image_link: $imageLink
        image_subtitle: $imageSubtitle
      }
      publishedAt: $publish
    }
  ) {
    data {
      id
      attributes {
        title
        link
        industry_piller {
          data {
            id
            attributes {
              title
              industry {
                data {
                  attributes {
                    title
                  }
                }
              }
            }
          }
        }
        key_highlights {
          id
          decision_makers
          decision_making_factors
          desired_business_objectives
          customer_pain_points
          proposed_technical_solution
          other_notable_attributes
          products
        }
        ideal_customer_profile {
          id
          industries
          geography
          market_cap
          employees
          budget
          image_link
          image_subtitle
        }
      }
    }
  }
}
`
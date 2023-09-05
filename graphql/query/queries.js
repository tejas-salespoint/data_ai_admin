import {gql} from "apollo-boost";

export const GET_INDUSTRIES = gql`
query GET_INDUSTRIES($sort: [String], $limit: Int) {
  industries(filters: {}, pagination:  { limit: $limit }, sort: $sort, publicationState: LIVE) {
    data {
      id
      attributes {
        title
        overview
        link
      }
    }
  }
}
`

export const GET_INDUSTRY_BY_ID = gql`
query GET_INDUSTRY_BY_ID($id: ID!) {
  industry(id: $id) {
    data {
      id
      attributes {
        title
        link
        overview
        industry_image {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`

export const CREATE_INDUSTRY = gql`
mutation CREATE_INDUSTRY(
  $title: String
  $link: String
  $overview: String
  $industry_piller: [ID]
  $publish: DateTime
  $image: ID
) {
  createIndustry(
    data: {
      title: $title
      overview: $overview
      link: $link
      industry_pillers: $industry_piller
      publishedAt: $publish
      industry_image: $image
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
  $decisionMakers: String
  $decisionMakersFactors: String
  $desiredBusinessObjectives: String
  $customerPainPoints: String
  $proposedTechnicalSolution: String
  $otherNotableAttributes: String
  $products: String
  $industryName: String
  $geography: String
  $marketCap: String
  $employees: String
  $image : ID
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
        image : $image
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
query GET_INDUSTRY_PILLERS($sort: [String], $limit: Int) {
  industryPillers(
    filters: {}
    pagination: { limit: $limit }
    sort: $sort
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
query GET_INDUSTRY_USECASES($sort: [String], $limit: Int) {
  usecases(filters: {}, pagination: { limit: $limit }, sort: $sort, publicationState: LIVE) {
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
mutation UpdateIndsutry($id : ID!, $title : String, $link : String, $overview : String,  $image: ID) {
  updateIndustry(id: $id, data: {
    title : $title
    link : $link
    overview : $overview 
    industry_image: $image
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
  $link : String
  $overview: String
  $industry_id: ID
) {
  updateIndustryPiller(
    id: $id
    data: {
      overview: $overview
      link : $link
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
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
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
  $decisionMakers: String
  $decisionMakersFactors: String
  $desiredBusinessObjectives: String
  $customerPainPoints: String
  $proposedTechnicalSolution: String
  $otherNotableAttributes: String
  $products: String
  $industryName: String
  $geography: String
  $marketCap: String
  $employees: String
  $budget: String
  $image: ID
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
        image: $image
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
          image {
            data {
              attributes {
                url
              }
            }
          }
          image_link
          image_subtitle
        }
      }
    }
  }
}

`

export const  GET_MEDIA_LIBRARY_QUERY = gql`
query GET_MEDIA_LIBRARY {
  uploadFiles(filters: {}, pagination: {}, sort: []) {
    data {
      id
      attributes {
        alternativeText
        caption
        createdAt
        ext
        name
        previewUrl
        url
        size
        mime
      }
    }
  }
}
`
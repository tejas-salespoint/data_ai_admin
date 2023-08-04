const data = {
    "usecase": {
        "__typename": "UsecaseEntityResponse",
        "data": {
            "__typename": "UsecaseEntity",
            "id": "1",
            "attributes": {
                "__typename": "Usecase",
                "title": "Automated Quality Inspection",
                "link": "automated-quality-inspection",
                "industry_piller": {
                    "__typename": "IndustryPillerEntityResponse",
                    "data": null
                },
                "key_highlights": {
                    "__typename": "ComponentL3KeyHighlightsKeysHighlights",
                    "id": "1",
                    "decision_makers": [
                        "sdfsd",
                        "sdfsd",
                        "sdfsd"
                    ],
                    "decision_making_factors": [
                        "sdfsdf",
                        "sdf"
                    ],
                    "desired_business_objectives": [
                        "sdfs"
                    ],
                    "customer_pain_points": [
                        "sdf"
                    ],
                    "proposed_technical_solution": [
                        "sdf"
                    ],
                    "other_notable_attributes": [
                        "sdfs"
                    ],
                    "products": [
                        "sdfsd"
                    ]
                },
                "ideal_customer_profile": {
                    "__typename": "ComponentL3KeyHighlightsIdealCustomerProfile",
                    "id": "1",
                    "industries": "manufactirng",
                    "geography": "india",
                    "market_cap": "1 billion",
                    "employees": "456",
                    "budget": "100 billion",
                    "image_link": "http://google.com",
                    "image_subtitle": "Hello submititle : manufacturing"
                }
            }
        }
    }
}
console.log(data?.usecase?.data?.attributes?.title)
console.log(data?.usecase?.data?.attributes?.industry_piller.data)
console.log(data?.usecase?.data?.attributes?.key_highlights.decision_makers)
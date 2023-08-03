const data = {
    "industryPiller": {
        "__typename": "IndustryPillerEntityResponse",
        "data": {
            "__typename": "IndustryPillerEntity",
            "id": "3",
            "attributes": {
                "__typename": "IndustryPiller",
                "title": "Enable Intelligent Factories",
                "overview": "To customize products and services for end customers—and innovate at the speed that product-as-a-service requires—manufacturing customers need an agile, responsive production process. They need solutions that can help you enable a “Intelligent Factory”. The journey to intelligent factories starts with connecting factory assets—adding sensors to machines and equipment to collect data, then monitoring and adjusting operations accordingly.​\n\nUltimately, you’ll want to connect and monitor factory performance across the globe, using data from smart assets to apply operational insights and further optimize your production processes. This is where even the most advanced manufacturing service providers such as Jabil, or the Industrial Automation giants such as Rockwell Automation, Schneider Automation, Siemens etc, are finding new opportunities by augmenting operational technologies (long powered by Windows embedded technologies), with new IT capabilities such as IoT, AI, Mixed Reality and secure and compliant communication and collaboration cloud capabilities.",
                "overview_link": "https://industryhub.transform.microsoft.com/enterprise-commercial/manufacturing?tab=overview",
                "industry": {
                    "__typename": "IndustryEntityResponse",
                    "data": {
                        "__typename": "IndustryEntity",
                        "id": "20"
                    }
                }
            }
        }
    }
}

console.log(data?.industryPiller?.data?.attributes?.industry?.data?.id)
function ActivityCard() {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="font-bold mb-4">
                Recent Activity
            </h2>

            <ul className="space-y-3 text-gray-600">

                <li>New shop added</li>
                <li>5 products purchased</li>
                <li>2 items sold</li>
                <li>Inventory updated</li>

            </ul>

        </div>

    )

}

export default ActivityCard
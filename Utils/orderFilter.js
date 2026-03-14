export const buildOrderFilter = (query, user = null, role = "customer") => {
    const filter = {};

    if (role === "customer") {
        filter.user = user._id;
    } else if (role === "seller") {
        filter["products.seller"] = user._id;
    }

    if (query.status) {

        filter.status = query.status;
    }
    if (query.paymentStatus) {
        filter.paymentStatus = query.paymentStatus;
    }
    if (query.customerId && role !== "customer") {
        filter.user = query.customerId;
    }

    if (query.startDate || query.endDate) {
        filter.createdAt = {};
        if (query.startDate) {
            filter.createdAt.$gte = new Date(query.startDate);
        }

        if (query.endDate) {
            filter.createdAt.$lte = new Date(query.endDate);
        }
    }

    if (query.productName) {
        filter["products.productName"] = { $regex: query.productName, $options: "i" };
    }

    if (query.minPrice || query.maxPrice) {
        filter.totalPrice = {};
        if (query.minPrice) {
            filter.totalPrice.$gte = Number(query.minPrice);
        }
        if (query.maxPrice) {
            filter.totalPrice.$lte = Number(query.maxPrice);
        }
    }

    return filter;
}
module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            paymentType: { type: String, required: true },
            serviceName: { type: String, required: true },
            price: { type: Number, required: true },
            monthlyDate: { type: Number, required: true },
            user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
            paymentHistory: [{
                paymentValue: { type: Number, required: true },
                paymentDate: { type: String, required: true },
                service: { type: String, required: true },
                paymentMethod: { type: String, required: true }
            }],
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Services = mongoose.model("services", schema);
    return Services;
}; 
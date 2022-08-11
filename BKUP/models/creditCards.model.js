module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true },
            cardNumber: { type: String, required: true },
            verificationValue: { type: Number, required: true },
            month: { type: Number, required: true },
            year: { type: Number, required: true },
            user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Directors = mongoose.model("creditCards", schema);
    return Directors;
}; 
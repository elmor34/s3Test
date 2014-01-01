var s3Uploader = (function () {

    var s3URI = encodeURI("https://ekobipictures.s3.amazonaws.com/"),
        policyBase64 = "policy.json",
        signature = "Vdn7uIFSYOIDZbkc4quGolAcqm8=",
        awsKey = 'AKIAIJHRN4VL3AIFFGYQ',
        acl = "public-read";

    function upload(imageURI, fileName) {

        var deferred = $.Deferred(),
            ft = new FileTransfer(),
            options = new FileUploadOptions();

        options.fileKey = "file";
        options.fileName = fileName;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = {
            "key": fileName,
            "AWSAccessKeyId": awsKey,
            "acl": acl,
            "policy": policyBase64,
            "signature": signature,
            "Content-Type": "image/jpeg"
        };

        ft.upload(imageURI, s3URI,
            function (e) {
                deferred.resolve(e);
            },
            function (e) {
                deferred.reject(e);
            }, options);

        return deferred.promise();

    }

    return {
        upload: upload
    }

}());
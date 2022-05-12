module.exports = {
  plugins: [
    {
      module: require("sourcebit-sample-plugin"),
      options: {
        titleCase: true
      }
    },
    {
      module: require("sourcebit-transform-assets"),
      options: {
        assetPath: function (entry, asset) {
          return [
            "assets",
            [asset.__metadata.id, asset.fileName].join("-")
          ].join("/");
        },
        publicUrl: function (entry, asset, assetPath) {
          return [
            "/assets",
            [asset.__metadata.id, asset.fileName].join("-")
          ].join("/");
        }
      }
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        pages: function (objects, utils) {
          return objects.reduce((pages, object) => {
            if (
              object.__metadata.modelName === "sample-data" &&
              object.__metadata.source === "sourcebit-sample-plugin"
            ) {
              return pages.concat({
                path: "/{slug}",
                page: { ...object, slug: utils.slugify(object["title"]) }
              });
            }

            return pages;
          }, []);
        }
      }
    }
  ]
};

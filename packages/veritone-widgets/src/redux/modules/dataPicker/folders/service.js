// const veritoneGraphQLUri = 'https://api.aws-dev.veritone.com/v3/graphiql';


export const getRootFolder = () => {
  const query = `query rootFolders($folderType: RootFolderType) {
    rootFolders(type: folderType) {
      id
      name
      ownerId
    }
  }`;
  // return fetchGraphql
};

export const getFolder = (id, folderOffset, tdoOffset) => {
  const query = `query folder($folderId: ID!, $folderOffset: Int, $tdoOffset: Int) {
    folder(id: ${id}) {
      id
      name
      createdDateTime
      modifiedDatTime
      childFolders(offset: ${folderOffset}) {
        records {
          id
          name
          description
          createdDateTime
          modifiedDateTime
        }
      }
      childTDOs(offset: ${tdoOffset}) {
        records {
          id
          name
          startDateTime
          stopDateTime
          thumbnailUrl
          sourceImageUrl
          primaryAsset (assetType: "media") {
            id
            name
            contentType
            signedUri
          }
          createdDateTime
          modifiedDateTime
          streams {
            uri
            protocol
          }
        }
      }
    }
  }`

  //return fetchGraphql
}

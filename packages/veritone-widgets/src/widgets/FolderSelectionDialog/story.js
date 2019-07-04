import React  from 'react';
//import { func } from 'prop-types';
import { storiesOf } from '@storybook/react';

import BaseStory from '../../shared/BaseStory';
import {FolderSelectionDialogWidget} from './';





storiesOf('FolderSelectionDialog', module).add('Base', () => {
  const props = {
    data: Data
  };

  return (
    <BaseStory
        widget={FolderSelectionDialogWidget} 
        widgetProps={props}
        
    />
  );
});


const Data = {"data":{"createRootFolders":[{"id":"0a8a0348-7ddf-4dd8-9238-8c9e6b8a21fb","treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1","organizationId":"7682","ownerId":null,"typeId":4,"orderIndex":0,"childTDOs":{"count":30,"records":[{"id":"101281860"},{"id":"101281859"},{"id":"101281858"},{"id":"101281857"},{"id":"101281855"},{"id":"101281854"},{"id":"101281852"},{"id":"101153776"},{"id":"101145017"},{"id":"100648842"},{"id":"100534371"},{"id":"100487107"},{"id":"100484558"},{"id":"100481726"},{"id":"100480705"},{"id":"100477052"},{"id":"100475387"},{"id":"100364828"},{"id":"100193369"},{"id":"100193368"},{"id":"100193367"},{"id":"100193366"},{"id":"100193365"},{"id":"100193364"},{"id":"100193363"},{"id":"100193361"},{"id":"100193359"},{"id":"100193358"},{"id":"100193357"},{"id":"100020291"}]},"childFolders":{"count":29,"limit":30,"offset":0,"records":[{"id":"27aaa505-d220-4b63-825f-9213a7b4a205","treeObjectId":"073b9f93-cf98-4d31-8464-0f5f73906bf6","orderIndex":28001,"name":"Engine Testing Media","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":5,"limit":30,"offset":0,"records":[{"treeObjectId":"3d8c021a-a0c5-466a-b6d6-fee5c164f862","name":"OCR","orderIndex":7},{"treeObjectId":"24773d8e-5ff2-4d02-85c7-9b1940ab3a69","name":"Vehicle","orderIndex":10},{"treeObjectId":"776b9c65-e890-4198-a7b7-0b01e961d008","name":"Transcription","orderIndex":9},{"treeObjectId":"86323dd3-18b3-494c-8cea-e59e2dfc0464","name":"Language ID","orderIndex":8},{"treeObjectId":"0e118dee-aa28-485b-a7ba-36b44cad88a9","name":"Translation","orderIndex":5}]},"childTDOs":{"count":5,"records":[{"id":"91504514"},{"id":"83908166"},{"id":"83907302"},{"id":"83906674"},{"id":"83906379"}]}},{"id":"1265969f-5993-4b8b-a4a4-bbf70ce55486","treeObjectId":"15d2348b-ae22-46c6-9fff-6279374882b9","orderIndex":7801,"name":"Hector - Spanish Test 11-2018","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":3,"records":[{"id":"220716615"},{"id":"220716614"},{"id":"220716613"}]}},{"id":"381ef233-e0e2-43aa-8c5e-9d305d94d33b","treeObjectId":"1d6f2190-1611-460d-93dd-f6535362cf66","orderIndex":3246,"name":"Linhle","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":7,"records":[{"id":"501411952"},{"id":"501411184"},{"id":"501365913"},{"id":"501363607"},{"id":"501361937"},{"id":"460557589"},{"id":"451252249"}]}},{"id":"20575e73-2923-4480-a15f-4ef01dc053e2","treeObjectId":"251b081b-6467-45fe-ab24-a4d8b73e4fda","orderIndex":4,"name":"NamLH","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":5,"records":[{"id":"511255173"},{"id":"511247060"},{"id":"451049543"},{"id":"511298633"},{"id":"451049381"}]}},{"id":"cbad7749-b8e4-401a-9fc1-4bd804c959b6","treeObjectId":"2b22396b-0ccc-4e3d-afbb-b3ad9cc43bb2","orderIndex":6,"name":"Chris Test","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":8,"records":[{"id":"550954390"},{"id":"550434384"},{"id":"450405987"},{"id":"450184265"},{"id":"450163832"},{"id":"450150661"},{"id":"440765503"},{"id":"440726122"}]}},{"id":"5b278a9e-ce87-4afc-a560-19f8ec463a43","treeObjectId":"2e67b718-966d-4d71-bcb5-5255f23f3418","orderIndex":5,"name":"LucyLe","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":4,"records":[{"id":"530023960"},{"id":"511249243"},{"id":"461039088"},{"id":"461035098"}]}},{"id":"d17904df-5a54-4a21-a280-a953c99f900a","treeObjectId":"30fa9f8c-dd70-46d9-ad49-7bcc5ad2f1e3","orderIndex":5555,"name":"khuong test","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":7,"records":[{"id":"550853540"},{"id":"520071926"},{"id":"480994977"},{"id":"500025963"},{"id":"341080539"},{"id":"341080538"},{"id":"341080537"}]}},{"id":"db612b92-6b41-4440-a367-b96e1ee08b64","treeObjectId":"33229011-ba8e-40e6-a89a-003c6ae7da1c","orderIndex":1,"name":"Dominguez Test","description":null,"modifiedDateTime":"2019-06-05T23:26:33.920Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":2,"records":[{"id":"550153132"},{"id":"520808227"}]}},{"id":"4ed33b9b-4fb3-4937-9f26-2362db07e530","treeObjectId":"33fc5bf7-fde7-4505-8d46-8e4b0f58a7ab","orderIndex":25873,"name":"IDentify","description":"Face Match app root folder","modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":4,"limit":30,"offset":0,"records":[{"treeObjectId":"ce7ce974-c98b-43e9-a1f9-3aa91c44a6fc","name":"Fisher goes to jail","orderIndex":0},{"treeObjectId":"c3bef975-6805-40fe-98a7-f909aca85e89","name":"Active Cases","orderIndex":1},{"treeObjectId":"c35d965c-0b97-48d8-9c91-c1516aa5f50b","name":"Closed Cases","orderIndex":2},{"treeObjectId":"e555ec0f-0384-4ad4-a6da-75952bb492ee","name":"Archived Cases","orderIndex":3}]},"childTDOs":{"count":0,"records":[]}},{"id":"9cb02f7e-7c9e-4e14-bcdb-b76a7223a7ee","treeObjectId":"419fb633-81c4-405d-af11-3825e96b4c6f","orderIndex":3461,"name":"Document Support","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":2,"limit":30,"offset":0,"records":[{"treeObjectId":"ac1acecd-acaa-4160-a82f-ba76f45bd43d","name":"default","orderIndex":3},{"treeObjectId":"d016f257-834f-4547-a05b-6260ced30dd7","name":"simple","orderIndex":2}]},"childTDOs":{"count":8,"records":[{"id":"490219091"},{"id":"411016430"},{"id":"401835063"},{"id":"401835060"},{"id":"401835059"},{"id":"401835058"},{"id":"401835057"},{"id":"401683549"}]}},{"id":"5e1b8d2f-d0b7-4bf6-bc82-f9fe052c465b","treeObjectId":"46aa0659-b639-4285-a150-5bf4cde0ec1c","orderIndex":7811,"name":"oia_test","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":0,"records":[]}},{"id":"972bd32d-3257-4c44-9d0e-7d51bfaef6d1","treeObjectId":"488d3de4-67cf-4497-a00e-63d09e38e219","orderIndex":13063,"name":"Ben Test","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":4,"records":[{"id":"490691647"},{"id":"490690979"},{"id":"401493325"},{"id":"260971652"}]}},{"id":"de9130ff-e6a1-4fc5-8805-43e9d47e1741","treeObjectId":"4bd76cbb-2c6e-492a-b35f-2206f9ec5e2f","orderIndex":545,"name":"SETA","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":18,"records":[{"id":"511262065"},{"id":"530889140"},{"id":"520066324"},{"id":"520066221"},{"id":"520066088"},{"id":"511271272"},{"id":"511271202"},{"id":"511266974"},{"id":"511269042"},{"id":"511266141"},{"id":"511264311"},{"id":"511260464"},{"id":"511259522"},{"id":"511257954"},{"id":"511253321"},{"id":"511209927"},{"id":"480092756"},{"id":"401575306"}]}},{"id":"a0afe35f-62ab-4a82-9a32-4b84d177bcba","treeObjectId":"4e2f2c69-7208-49af-8845-69a3881c0b4c","orderIndex":5214,"name":"Howard","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":30,"records":[{"id":"310946403"},{"id":"310946402"},{"id":"310946401"},{"id":"310946400"},{"id":"310946399"},{"id":"310946398"},{"id":"310946397"},{"id":"310946396"},{"id":"310946395"},{"id":"310946394"},{"id":"310946393"},{"id":"310946391"},{"id":"310946390"},{"id":"310946388"},{"id":"310946387"},{"id":"310946386"},{"id":"310946385"},{"id":"310946383"},{"id":"310946384"},{"id":"310946381"},{"id":"310946379"},{"id":"310946377"},{"id":"310946374"},{"id":"310946373"},{"id":"271160714"},{"id":"280696264"},{"id":"280180002"},{"id":"280176089"},{"id":"271153502"},{"id":"271151199"}]}},{"id":"b8743ac4-1b2d-4770-95e3-be5820aa553b","treeObjectId":"4fc6ade1-9574-4d28-9cf8-1f622a77556d","orderIndex":4722,"name":"Univision Benchmarking","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":1,"records":[{"id":"310734862"}]}},{"id":"c024b170-5641-4a42-b43c-13c1d6a40994","treeObjectId":"5016978a-6826-490c-8550-27132c41e811","orderIndex":27802,"name":"Engine Testing by Ecosystem","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":25,"records":[{"id":"87153553"},{"id":"118152777"},{"id":"118152767"},{"id":"103864215"},{"id":"103863768"},{"id":"90526315"},{"id":"90521370"},{"id":"89404888"},{"id":"89101352"},{"id":"89101348"},{"id":"89101347"},{"id":"89101346"},{"id":"88842532"},{"id":"88831941"},{"id":"87716417"},{"id":"87689423"},{"id":"87164533"},{"id":"87164532"},{"id":"87153554"},{"id":"87142320"},{"id":"87142319"},{"id":"87142318"},{"id":"86912069"},{"id":"86907354"},{"id":"86895730"}]}},{"id":"5fed0204-f1a9-46ad-8d4e-1552bf570d91","treeObjectId":"55bd53a5-f5b5-46ce-af70-3dee30a950b4","orderIndex":3552,"name":"Aarons tests","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":6,"limit":30,"offset":0,"records":[{"treeObjectId":"749a3432-205a-46f8-808a-b586bf716852","name":"benchmarkingtest","orderIndex":39},{"treeObjectId":"8f25d0d6-a0e1-43cc-a4d8-5ebef4f1cb03","name":"newobjectboxtest","orderIndex":4},{"treeObjectId":"3b8037ee-9b33-48cb-8ee2-a3c61a931262","name":"EBU demo","orderIndex":2},{"treeObjectId":"422c4d75-ed82-49da-9622-eaac74273f53","name":"CNBC_closingbell","orderIndex":1},{"treeObjectId":"9c6e3f1e-134d-4f03-b42b-2e21c5d6a723","name":"deepaffectsbenchmark","orderIndex":3},{"treeObjectId":"38421257-ce88-4d7d-899d-778de859969d","name":"Smoking","orderIndex":0}]},"childTDOs":{"count":30,"records":[{"id":"381280570"},{"id":"381012058"},{"id":"380274078"},{"id":"380274077"},{"id":"380274076"},{"id":"380274075"},{"id":"380274074"},{"id":"380237403"},{"id":"371146365"},{"id":"371167662"},{"id":"370856125"},{"id":"370537614"},{"id":"361191012"},{"id":"361188647"},{"id":"361188646"},{"id":"361188645"},{"id":"361188644"},{"id":"361122586"},{"id":"361158001"},{"id":"361158000"},{"id":"361157999"},{"id":"360859660"},{"id":"360216890"},{"id":"360210702"},{"id":"350517515"},{"id":"350517516"},{"id":"350486437"},{"id":"350231770"},{"id":"341252511"},{"id":"341251798"}]}},{"id":"81d9ee07-c44a-4b57-963e-8fe9921836c4","treeObjectId":"657f4471-b04d-45f9-aaa3-c97790270b29","orderIndex":27789,"name":"Bi","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":30,"records":[{"id":"111289113"},{"id":"111271318"},{"id":"111251171"},{"id":"111249859"},{"id":"111249855"},{"id":"111174087"},{"id":"111171706"},{"id":"111171647"},{"id":"111169242"},{"id":"111167137"},{"id":"111167028"},{"id":"111079178"},{"id":"111078727"},{"id":"109713529"},{"id":"109713001"},{"id":"109707945"},{"id":"103980192"},{"id":"103980191"},{"id":"103980189"},{"id":"103979586"},{"id":"103979585"},{"id":"103979584"},{"id":"102949544"},{"id":"102949546"},{"id":"102949545"},{"id":"101593632"},{"id":"101156261"},{"id":"101156260"},{"id":"101155312"},{"id":"101155311"}]}},{"id":"86fee0e4-2b7e-4d7a-a26f-a87c7797fcad","treeObjectId":"6c000217-abbb-4606-975f-157b4e4a72fb","orderIndex":27806,"name":"HEARTBEAT (ONLY)","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":3,"limit":30,"offset":0,"records":[{"treeObjectId":"9df20ea4-07fc-49fd-ae00-22f933d1e817","name":"SPEECH","orderIndex":26},{"treeObjectId":"1de5bfb6-bb2d-44b4-962e-a9adcd6ced07","name":"TEXT","orderIndex":25},{"treeObjectId":"76b910f3-4b0b-4312-a149-5cff66384752","name":"OTHER","orderIndex":24}]},"childTDOs":{"count":24,"records":[{"id":"94824460"},{"id":"94823678"},{"id":"94823194"},{"id":"94821548"},{"id":"94820840"},{"id":"94820245"},{"id":"94818615"},{"id":"94817861"},{"id":"94817344"},{"id":"94815670"},{"id":"94815024"},{"id":"94814437"},{"id":"94812923"},{"id":"94812103"},{"id":"94811638"},{"id":"94810008"},{"id":"94809307"},{"id":"94808739"},{"id":"94807116"},{"id":"94806324"},{"id":"94805793"},{"id":"94804146"},{"id":"94803405"},{"id":"94802840"}]}},{"id":"cecc3d0e-988a-4519-83de-0aa80a7f9d3a","treeObjectId":"802d3806-ce6b-4105-96c0-1027da10e300","orderIndex":5642,"name":"Intel","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":1,"records":[{"id":"250734588"}]}},{"id":"89370d2c-f318-43cd-8f80-6fbef9ea7f0e","treeObjectId":"83f65cfc-0875-4e32-af30-3433c610a6c7","orderIndex":27987,"name":"Testing Session Timeout","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":3,"records":[{"id":"102313641"},{"id":"66845076"},{"id":"66845406"}]}},{"id":"09205076-37f3-48c1-9a9f-8b44f8b2a301","treeObjectId":"93624f08-eba3-409f-be9a-ff4af748855e","orderIndex":27743,"name":"Lance and Hong Game Test ( do not delete)","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":30,"records":[{"id":"240215091"},{"id":"240215048"},{"id":"210682081"},{"id":"210628232"},{"id":"210628231"},{"id":"210625575"},{"id":"210441020"},{"id":"210235312"},{"id":"210235311"},{"id":"210235310"},{"id":"210235309"},{"id":"210235308"},{"id":"210235307"},{"id":"210235306"},{"id":"210235305"},{"id":"210235304"},{"id":"210235303"},{"id":"210170619"},{"id":"210170618"},{"id":"210170041"},{"id":"92839524"},{"id":"92839523"},{"id":"92839522"},{"id":"92839521"},{"id":"92839520"},{"id":"92839519"},{"id":"92762195"},{"id":"92762194"},{"id":"92762193"},{"id":"92762192"}]}},{"id":"76fa1011-9e1b-43b9-9660-a80e3d6b70e8","treeObjectId":"959ab62b-6ebe-4580-af46-26d8df738bae","orderIndex":2,"name":"LucyLe Result","description":null,"modifiedDateTime":"2019-05-15T06:44:44.231Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":4,"records":[{"id":"511207143"},{"id":"511207120"},{"id":"510807722"},{"id":"521122467"}]}},{"id":"f0fd57aa-d4bf-450e-b37c-d5d65e65afd4","treeObjectId":"b194578c-106d-489e-8731-6c4ce67d849c","orderIndex":0,"name":"Ken Test","description":null,"modifiedDateTime":"2019-06-27T23:56:19.035Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":0,"records":[]}},{"id":"fc0c1276-6b83-4ad7-9c3f-61a51c44aad6","treeObjectId":"c967721a-edbe-43ef-8e57-703cba7f0348","orderIndex":3,"name":"Test","description":null,"modifiedDateTime":"2019-05-15T06:44:44.231Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":0,"records":[]}},{"id":"49e0fa5d-c4e3-4a92-8241-b498d6c2272b","treeObjectId":"ca79a937-decf-4300-b17c-ad9fd9486596","orderIndex":4241,"name":"Vu","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":16,"records":[{"id":"530911778"},{"id":"530909847"},{"id":"361673899"},{"id":"360608436"},{"id":"360608435"},{"id":"360325812"},{"id":"360332011"},{"id":"351816613"},{"id":"351697144"},{"id":"351697143"},{"id":"351697142"},{"id":"351694917"},{"id":"350203340"},{"id":"340951845"},{"id":"540430110"},{"id":"361958363"}]}},{"id":"4cd3db35-8864-43b0-91d8-7068ae697467","treeObjectId":"d40b8c9f-f627-4c41-a668-58ccb653b899","orderIndex":4995,"name":"qd","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":7,"records":[{"id":"321327395"},{"id":"321326206"},{"id":"290697862"},{"id":"310493355"},{"id":"310485940"},{"id":"300705936"},{"id":"300703289"}]}},{"id":"42d427e5-10e7-48a5-bbb5-7f9b79e77095","treeObjectId":"e300be15-e2fc-4183-85cc-4224efc58504","orderIndex":2087,"name":"Speaker Detection","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":7,"limit":30,"offset":0,"records":[{"treeObjectId":"e8b9954c-2f41-4017-ac5f-b2562dbb494c","name":"Old Random Clips","orderIndex":3},{"treeObjectId":"3567e862-dd64-447a-85e8-d6af212b2d35","name":"OCPDO","orderIndex":2},{"treeObjectId":"a2d13092-2cfe-4bad-86be-5fff859bac4c","name":"Data Type Experiments","orderIndex":13},{"treeObjectId":"82fd606b-f34b-48d8-8fe7-4e7b5e8839ea","name":"CNBC Speaker Rec","orderIndex":5},{"treeObjectId":"dcedda85-1d3d-41cc-abec-2321cf81ed52","name":"Broadcast Eval","orderIndex":4},{"treeObjectId":"4c4922e3-24a5-44d3-90c4-2db5ac514ae1","name":"Bloomberg","orderIndex":1},{"treeObjectId":"6b437c0b-cbfa-4ccb-aea0-51ffcb5cfeef","name":"DeepAffects","orderIndex":0}]},"childTDOs":{"count":2,"records":[{"id":"490174322"},{"id":"400955224"}]}},{"id":"48aefb98-ef76-42a8-898f-efde795d79ce","treeObjectId":"ed6c7932-4bb8-4a2d-81ca-804c25945a13","orderIndex":13341,"name":"TEST","description":null,"modifiedDateTime":"2019-05-29T22:20:49.567Z","status":"active","typeId":1,"parent":{"treeObjectId":"437f72f3-bfdd-44fa-9973-bbb1a6019ed1"},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]},"childTDOs":{"count":12,"records":[{"id":"421231846"},{"id":"370588612"},{"id":"370588611"},{"id":"370587127"},{"id":"350492206"},{"id":"341254299"},{"id":"340766126"},{"id":"251206166"},{"id":"119610530"},{"id":"119610061"},{"id":"116829766"},{"id":"116806608"}]}}]}},{"id":"ec354dab-b038-4a0c-ba99-de3a1d6fc449","treeObjectId":"ad37d1fd-d316-4828-85fa-cb40a5d5a453","organizationId":null,"ownerId":"7a369f3e-5438-496b-b9e0-ca831a426849","typeId":4,"orderIndex":0,"childTDOs":{"count":0,"records":[]},"childFolders":{"count":0,"limit":30,"offset":0,"records":[]}}]}}

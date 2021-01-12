const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
   ac.grant("basic")
      .createOwn("campaign")
      .createOwn("comment")
      // .readAny("campaign")
      // .readAny("comment")
      // .updateOwn("campaign")
     
   ac.grant("admin")
      .extend("basic")
      .updateAny("campaign")
      .deleteAny("campaign")
      .updateAny("comment")
      .deleteAny("comment")
   
   return ac;
})();
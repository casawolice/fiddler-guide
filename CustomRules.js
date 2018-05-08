import System;
import System.Windows.Forms;
import Fiddler;
import System.IO;

// INTRODUCTION
// This is the FiddlerScript Rules file, which creates some of the menu commands and
// other features of Fiddler. You can edit this file to modify or add new commands.
//
// The original version of this file is named SampleRules.js and it is in the
// \Program Files\Fiddler\ folder. When Fiddler first starts, it creates a copy named
// CustomRules.js inside your \Documents\Fiddler2\Scripts folder. If you make a 
// mistake in editing this file, simply delete the CustomRules.js file and restart
// Fiddler. A fresh copy of the default rules will be created from the original
// sample rules file.

// GLOBALIZATION NOTE:
// Be sure to save this file with UTF-8 Encoding if using any non-ASCII characters
// in strings, etc.

// JScript.NET Reference
// http://fiddler2.com/r/?msdnjsnet
//
// FiddlerScript Reference
// http://fiddler2.com/r/?fiddlerscriptcookbook
//
// FiddlerScript Editor: 
// http://fiddler2.com/fiddlerscript-editor

/**
 * Fiddler 自定义脚本
 * 
 * @author frank
 * @email frank@mondol.info
 * @created 2016-08-22
 */
class Handlers
{
    /******************** 配置开始 ********************/

    /* 客户端IP白名单 */
    static var sClientIpWhitelist = ["127.0.0.1","192.168.123.1","10.133.146.70"];
        
    /* 
     * 请求URL黑名单
     * 此名单采用模糊匹配，只要请求URL包含此名单中的字符串就满足条件
     */
    static var sUrlBacklist = ["/generate_204"];           
        
    /******************** 配置结束 ********************/


    /******************** 回调开始 ********************/

    /**
    * 开始请求前的回调
    * 
    * @return {boolean} true: 终止后面的操作 | false: 不终止
    */
    static function OnBeforeRequestCallback(oSession: Session) {
        AddRules(oSession);
       
    }

    /**
     * PEEK响应头的回调
     * 
     * @return {boolean} true: 终止后面的操作 | false: 不终止
     */
    static function OnPeekAtResponseHeadersCallback(oSession: Session) {
    }

    /**
     * 返回响应头前的回调
     * 
     * @return {boolean} true: 终止后面的操作 | false: 不终止
     */
    static function OnBeforeResponseCallback(oSession: Session) {
    }

    /******************** 回调结束 ********************/        
        
        
    /******************** 列配置开始 ********************/

    // The following snippet demonstrates a custom-bound column for the Web Sessions list.
    // See http://fiddler2.com/r/?fiddlercolumns for more info
    public static BindUIColumn("Method", 60)
    function FillMethodColumn(oS: Session): String {
        return oS.RequestMethod;
    }
    
    public static BindUIColumn("ClientIP", 120)
    function FillClientIPColumn(oS: Session): String {
        return oS.clientIP;
    }
   
    /******************** 列配置结束 ********************/

    // The following snippet demonstrates how to create a custom tab that shows simple text
    /*
    public BindUITab("Flags")
    static function FlagsReport(arrSess: Session[]):String {
    var oSB: System.Text.StringBuilder = new System.Text.StringBuilder();
    for (var i:int = 0; i<arrSess.Length; i++)
    {
    oSB.AppendLine("SESSION FLAGS");
    oSB.AppendFormat("{0}: {1}\n", arrSess[i].id, arrSess[i].fullUrl);
    for(var sFlag in arrSess[i].oFlags)
    {
    oSB.AppendFormat("\t{0}:\t\t{1}\n", sFlag.Key, sFlag.Value);
    }
    }
    return oSB.ToString();
    }
    */

    public static RulesOption("Hide 304s")
    BindPref("fiddlerscript.rules.Hide304s")
    var m_Hide304s: boolean = false;

    // Cause Fiddler to override the Accept-Language header with one of the defined values
    public static RulesOption("Request &Japanese Content")
    var m_Japanese: boolean = false;

    // Automatic Authentication
    public static RulesOption("&Automatically Authenticate")
    BindPref("fiddlerscript.rules.AutoAuth")
    var m_AutoAuth: boolean = false;
        
            
    // Cause Fiddler to override the User-Agent header with one of the defined values
    RulesString("&User-Agents", true) 
    BindPref("fiddlerscript.ephemeral.UserAgentString")
    RulesStringValue(0,"Netscape &3", "Mozilla/3.0 (Win95; I)")
    RulesStringValue(1,"WinPhone7", "Mozilla/4.0 (compatible: MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; SAMSUNG; SGH-i917)")
    RulesStringValue(2,"WinPhone8.1", "Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 520) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537")
    RulesStringValue(3,"&Safari5 (Win7)", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1")
    RulesStringValue(4,"Safari7 (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9) AppleWebKit/537.71 (KHTML, like Gecko) Version/7.0 Safari/537.71")
    RulesStringValue(5,"iPad", "Mozilla/5.0 (iPad; CPU OS 8_1_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B440 Safari/600.1.4")
    RulesStringValue(6,"iPhone6", "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A405 Safari/8536.25")
    RulesStringValue(7,"IE &6 (XPSP2)", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)")
    RulesStringValue(8,"IE &7 (Vista)", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1)")
    RulesStringValue(9,"IE 8 (Win2k3 x64)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; WOW64; Trident/4.0)")
    RulesStringValue(10,"IE &8 (Win7)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)")
    RulesStringValue(11,"IE 9 (Win7)", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)")
    RulesStringValue(12,"IE 10 (Win8)", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)")
    RulesStringValue(13,"IE 11 (Surface2)", "Mozilla/5.0 (Windows NT 6.3; ARM; Trident/7.0; Touch; rv:11.0) like Gecko")
    RulesStringValue(14,"IE 11 (Win8.1)", "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko")
    RulesStringValue(15,"IE 12 (Win10)", "Mozilla/5.0 (Windows NT 6.4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36 Edge/12.0")
    RulesStringValue(16,"&Opera", "Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17")
    RulesStringValue(17,"&Firefox 3.6", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.7) Gecko/20100625 Firefox/3.6.7")
    RulesStringValue(18,"&Firefox 36", "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0")
    RulesStringValue(19,"&Firefox Phone", "Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0")
    RulesStringValue(20,"&Firefox (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0")
    RulesStringValue(21,"Chrome", "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.39 Safari/537.36")
    RulesStringValue(22,"ChromeBook", "Mozilla/5.0 (X11; CrOS x86_64 6680.52.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.74 Safari/537.36")
    RulesStringValue(23,"GoogleBot Crawler", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")
    RulesStringValue(24,"Kindle Fire (Silk)", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.22.79_10013310) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true")
    RulesStringValue(25,"&Custom...", "%CUSTOM%")
    public static var sUA: String = null;

    // Cause Fiddler to delay HTTP traffic to simulate typical 56k modem conditions
    public static RulesOption("Simulate &Modem Speeds", "Per&formance")
    var m_SimulateModem: boolean = false;

    // Removes HTTP-caching related headers and specifies "no-cache" on requests and responses
    public static RulesOption("&Disable Caching", "Per&formance")
    var m_DisableCaching: boolean = false;

    public static RulesOption("Cache Always &Fresh", "Per&formance")
    var m_AlwaysFresh: boolean = false;
        
    // Force a manual reload of the script file.  Resets all
    // RulesOption variables to their defaults.
    public static ToolsAction("Reset Script")
    function DoManualReload() { 
        FiddlerObject.ReloadScript();
    }

    public static ContextAction("Decode Selected Sessions")
    function DoRemoveEncoding(oSessions: Session[]) {
        for (var x:int = 0; x < oSessions.Length; x++){
            oSessions[x].utilDecodeRequest();
            oSessions[x].utilDecodeResponse();
        }
        UI.actUpdateInspector(true,true);
    }

    static function OnBoot() {
        // MessageBox.Show("Fiddler has finished booting");
        // System.Diagnostics.Process.Start("iexplore.exe");

        // UI.ActivateRequestInspector("HEADERS");
        // UI.ActivateResponseInspector("HEADERS");
    }
    
    static function OnShutdown() {
        // MessageBox.Show("Fiddler has shutdown");
    }

    static function OnAttach() {
        // MessageBox.Show("Fiddler is now the system proxy");
    }

    static function OnDetach() {
        // MessageBox.Show("Fiddler is no longer the system proxy");
    }

    static function OnBeforeRequest(oSession: Session) {
        if(OnBeforeRequestCallback(oSession))
            return;

        /** 关闭缓存 **/
        if (m_DisableCache && m_EnableCustomRule) {
            oSession.oRequest.headers.Remove("If-None-Match");
            oSession.oRequest.headers.Remove("If-Modified-Since");
            oSession.oRequest["Pragma"] = "no-cache";
        }
        
        /** 隐藏URL黑名单中的请求 **/
        if(m_HideByUrlBacklist && m_EnableCustomRule){
            for(var x in sUrlBacklist){
                if(oSession.uriContains(sUrlBacklist[x])){
                    oSession.Ignore();
                    break;
                }
            }
        }       
        
        /** 阻止白名单之外的客户端使用代理 **/
        if(m_DenyWithoutIpWhitelist && m_EnableCustomRule){
            var bOk = false;
            for(var x in sClientIpWhitelist){
                if(oSession.clientIP.EndsWith(sClientIpWhitelist[x])){
                    bOk = true;
                    break;
                }
            }
            if(!bOk){
                SetResponse(oSession, 200, "请不要蹭网哦~~！<br/>请检查并关闭你的WiFi代理...<br/><br/> By Frank",null);
                oSession.Ignore();
            }
        }        
        
        /** 隐藏所有来源请求 **/
        if(m_HideAllRequest){
            oSession.Ignore(); 
        }
        
        
        // Sample Rule: Color ASPX requests in RED
        // if (oSession.uriContains(".aspx")) {    oSession["ui-color"] = "red";    }

        // Sample Rule: Flag POSTs to fiddler2.com in italics
        // if (oSession.HostnameIs("www.fiddler2.com") && oSession.HTTPMethodIs("POST")) {    oSession["ui-italic"] = "yup";    }

        // Sample Rule: Break requests for URLs containing "/sandbox/"
        // if (oSession.uriContains("/sandbox/")) {
        //     oSession.oFlags["x-breakrequest"] = "yup";    // Existence of the x-breakrequest flag creates a breakpoint; the "yup" value is unimportant.
        // }

        if ((null != gs_ReplaceToken) && (oSession.url.indexOf(gs_ReplaceToken)>-1)) {   // Case sensitive
            oSession.url = oSession.url.Replace(gs_ReplaceToken, gs_ReplaceTokenWith); 
        }
        if ((null != gs_OverridenHost) && (oSession.host.toLowerCase() == gs_OverridenHost)) {
            oSession["x-overridehost"] = gs_OverrideHostWith; 
        }

        if ((null!=bpRequestURI) && oSession.uriContains(bpRequestURI)) {
            oSession["x-breakrequest"]="uri";
        }

        if ((null!=bpMethod) && (oSession.HTTPMethodIs(bpMethod))) {
            oSession["x-breakrequest"]="method";
        }

        if ((null!=uiBoldURI) && oSession.uriContains(uiBoldURI)) {
            oSession["ui-bold"]="QuickExec";
        }

        if (m_SimulateModem) {
            // Delay sends by 300ms per KB uploaded.
            oSession["request-trickle-delay"] = "300"; 
            // Delay receives by 150ms per KB downloaded.
            oSession["response-trickle-delay"] = "150"; 
        }
        

        // User-Agent Overrides
        if (null != sUA) {
            oSession.oRequest["User-Agent"] = sUA; 
        }

        if (m_Japanese) {
            oSession.oRequest["Accept-Language"] = "ja";
        }

        if (m_AutoAuth) {
            // Automatically respond to any authentication challenges using the 
            // current Fiddler user's credentials. You can change (default)
            // to a domain\\username:password string if preferred.
            //
            // WARNING: This setting poses a security risk if remote 
            // connections are permitted!
            oSession["X-AutoAuth"] = "(default)";
        }

        if (m_AlwaysFresh && (oSession.oRequest.headers.Exists("If-Modified-Since") || oSession.oRequest.headers.Exists("If-None-Match")))
        {
            oSession.utilCreateResponseAndBypassServer();
            oSession.responseCode = 304;
            oSession["ui-backcolor"] = "Lavender";
        }
    }

    // This function is called immediately after a set of request headers has
    // been read from the client. This is typically too early to do much useful
    // work, since the body hasn't yet been read, but sometimes it may be useful.
    //
    // For instance, see 
    // http://blogs.msdn.com/b/fiddler/archive/2011/11/05/http-expect-continue-delays-transmitting-post-bodies-by-up-to-350-milliseconds.aspx
    // for one useful thing you can do with this handler.
    //
    // Note: oSession.requestBodyBytes is not available within this function!
    // static function OnPeekAtRequestHeaders(oSession: Session) {
    // }

    //
    // If a given session has response streaming enabled, then the OnBeforeResponse function 
    // is actually called AFTER the response was returned to the client.
    //
    // In contrast, this OnPeekAtResponseHeaders function is called before the response headers are 
    // sent to the client (and before the body is read from the server).  Hence this is an opportune time 
    // to disable streaming (oSession.bBufferResponse = true) if there is something in the response headers 
    // which suggests that tampering with the response body is necessary.
    // 
    // Note: oSession.responseBodyBytes is not available within this function!
    //
    static function OnPeekAtResponseHeaders(oSession: Session) {
        if(OnPeekAtResponseHeadersCallback(oSession))
            return;

        /** 隐藏指定类型的文件 **/
        if(m_HideOtherRequest && m_EnableCustomRule && oSession.oResponse != null){
            var headers = oSession.oResponse.headers;
            if(headers.ExistsAndContains("Content-Type", "text/css")) oSession.Ignore();
            else if(headers.ExistsAndContains("Content-Type", "image")) oSession.Ignore();
            else if(headers.ExistsAndContains("Content-Type", "script")) oSession.Ignore();
            else if(headers.ExistsAndContains("Content-Type", "x-shockwave-flash")) oSession.Ignore();
        }
        
        
        //FiddlerApplication.Log.LogFormat("Session {0}: Response header peek shows status is {1}", oSession.id, oSession.responseCode);
        if (m_DisableCaching) {
            oSession.oResponse.headers.Remove("Expires");
            oSession.oResponse["Cache-Control"] = "no-cache";
        }

        if ((bpStatus>0) && (oSession.responseCode == bpStatus)) {
            oSession["x-breakresponse"]="status";
            oSession.bBufferResponse = true;
        }
        
        if ((null!=bpResponseURI) && oSession.uriContains(bpResponseURI)) {
            oSession["x-breakresponse"]="uri";
            oSession.bBufferResponse = true;
        }

    }

    static function OnBeforeResponse(oSession: Session) {
        if(OnBeforeResponseCallback(oSession))
            return;

        if (m_Hide304s && oSession.responseCode == 304) {
            oSession["ui-hide"] = "true";
        }
    }

/*
    // This function executes just before Fiddler returns an error that it has 
    // itself generated (e.g. "DNS Lookup failure") to the client application.
    // These responses will not run through the OnBeforeResponse function above.
    static function OnReturningError(oSession: Session) {
    }
*/
/*
    // This function executes after Fiddler finishes processing a Session, regardless
    // of whether it succeeded or failed. Note that this typically runs AFTER the last
    // update of the Web Sessions UI listitem, so you must manually refresh the Session's
    // UI if you intend to change it.
    static function OnDone(oSession: Session) {
    }
*/

    // The Main() function runs everytime your FiddlerScript compiles
    static function Main() {
        var today: Date = new Date();
        FiddlerObject.StatusText = " CustomRules.js was loaded at: " + today;

        // Uncomment to add a "Server" column containing the response "Server" header, if present
        // UI.lvSessions.AddBoundColumn("Server", 50, "@response.server");

        // Uncomment to add a global hotkey (Win+G) that invokes the ExecAction method below...
        // UI.RegisterCustomHotkey(HotkeyModifiers.Windows, Keys.G, "screenshot"); 
    }

    // These static variables are used for simple breakpointing & other QuickExec rules 
    BindPref("fiddlerscript.ephemeral.bpRequestURI")
    public static var bpRequestURI:String = null;

    BindPref("fiddlerscript.ephemeral.bpResponseURI")
    public static var bpResponseURI:String = null;

    BindPref("fiddlerscript.ephemeral.bpMethod")
    public static var bpMethod: String = null;

    static var bpStatus:int = -1;
    static var uiBoldURI: String = null;
    static var gs_ReplaceToken: String = null;
    static var gs_ReplaceTokenWith: String = null;
    static var gs_OverridenHost: String = null;
    static var gs_OverrideHostWith: String = null;

    // The OnExecAction function is called by either the QuickExec box in the Fiddler window,
    // or by the ExecAction.exe command line utility.
    static function OnExecAction(sParams: String[]): Boolean {

        FiddlerObject.StatusText = "ExecAction: " + sParams[0];

        var sAction = sParams[0].toLowerCase();
        switch (sAction) {
            case "bold":
                if (sParams.Length<2) {uiBoldURI=null; FiddlerObject.StatusText="Bolding cleared"; return false;}
                uiBoldURI = sParams[1]; FiddlerObject.StatusText="Bolding requests for " + uiBoldURI;
                return true;
            case "bp":
                FiddlerObject.alert("bpu = breakpoint request for uri\nbpm = breakpoint request method\nbps=breakpoint response status\nbpafter = breakpoint response for URI");
                return true;
            case "bps":
                if (sParams.Length<2) {bpStatus=-1; FiddlerObject.StatusText="Response Status breakpoint cleared"; return false;}
                bpStatus = parseInt(sParams[1]); FiddlerObject.StatusText="Response status breakpoint for " + sParams[1];
                return true;
            case "bpv":
            case "bpm":
                if (sParams.Length<2) {bpMethod=null; FiddlerObject.StatusText="Request Method breakpoint cleared"; return false;}
                bpMethod = sParams[1].toUpperCase(); FiddlerObject.StatusText="Request Method breakpoint for " + bpMethod;
                return true;
            case "bpu":
                if (sParams.Length<2) {bpRequestURI=null; FiddlerObject.StatusText="RequestURI breakpoint cleared"; return false;}
                bpRequestURI = sParams[1]; 
                FiddlerObject.StatusText="RequestURI breakpoint for "+sParams[1];
                return true;
            case "bpa":
            case "bpafter":
                if (sParams.Length<2) {bpResponseURI=null; FiddlerObject.StatusText="ResponseURI breakpoint cleared"; return false;}
                bpResponseURI = sParams[1]; 
                FiddlerObject.StatusText="ResponseURI breakpoint for "+sParams[1];
                return true;
            case "overridehost":
                if (sParams.Length<3) {gs_OverridenHost=null; FiddlerObject.StatusText="Host Override cleared"; return false;}
                gs_OverridenHost = sParams[1].toLowerCase();
                gs_OverrideHostWith = sParams[2];
                FiddlerObject.StatusText="Connecting to [" + gs_OverrideHostWith + "] for requests to [" + gs_OverridenHost + "]";
                return true;
            case "urlreplace":
                if (sParams.Length<3) {gs_ReplaceToken=null; FiddlerObject.StatusText="URL Replacement cleared"; return false;}
                gs_ReplaceToken = sParams[1];
                gs_ReplaceTokenWith = sParams[2].Replace(" ", "%20");  // Simple helper
                FiddlerObject.StatusText="Replacing [" + gs_ReplaceToken + "] in URIs with [" + gs_ReplaceTokenWith + "]";
                return true;
            case "allbut":
            case "keeponly":
                if (sParams.Length<2) { FiddlerObject.StatusText="Please specify Content-Type to retain during wipe."; return false;}
                UI.actSelectSessionsWithResponseHeaderValue("Content-Type", sParams[1]);
                UI.actRemoveUnselectedSessions();
                UI.lvSessions.SelectedItems.Clear();
                FiddlerObject.StatusText="Removed all but Content-Type: " + sParams[1];
                return true;
            case "stop":
                UI.actDetachProxy();
                return true;
            case "start":
                UI.actAttachProxy();
                return true;
            case "cls":
            case "clear":
                UI.actRemoveAllSessions();
                return true;
            case "g":
            case "go":
                UI.actResumeAllSessions();
                return true;
            case "goto":
                if (sParams.Length != 2) return false;
                Utilities.LaunchHyperlink("http://www.google.com/search?hl=en&btnI=I%27m+Feeling+Lucky&q=" + Utilities.UrlEncode(sParams[1]));
                return true;
            case "help":
                Utilities.LaunchHyperlink("http://fiddler2.com/r/?quickexec");
                return true;
            case "hide":
                UI.actMinimizeToTray();
                return true;
            case "log":
                FiddlerApplication.Log.LogString((sParams.Length<2) ? "User couldn't think of anything to say..." : sParams[1]);
                return true;
            case "nuke":
                UI.actClearWinINETCache();
                UI.actClearWinINETCookies(); 
                return true;
            case "screenshot":
                UI.actCaptureScreenshot(false);
                return true;
            case "show":
                UI.actRestoreWindow();
                return true;
            case "tail":
                if (sParams.Length<2) { FiddlerObject.StatusText="Please specify # of sessions to trim the session list to."; return false;}
                UI.TrimSessionList(int.Parse(sParams[1]));
                return true;
            case "quit":
                UI.actExit();
                return true;
            case "dump":
                UI.actSelectAll();
                UI.actSaveSessionsToZip(CONFIG.GetPath("Captures") + "dump.saz");
                UI.actRemoveAllSessions();
                FiddlerObject.StatusText = "Dumped all sessions to " + CONFIG.GetPath("Captures") + "dump.saz";
                return true;

            default:
                if (sAction.StartsWith("http") || sAction.StartsWith("www.")) {
                    System.Diagnostics.Process.Start(sParams[0]);
                    return true;
                }
                else
                {
                    FiddlerObject.StatusText = "Requested ExecAction: '" + sAction + "' not found. Type HELP to learn more.";
                    return false;
                }
        }
    }
        
    static function SetResponse(oSession: Session, statusCode: Int32, body: String, contentType: String) {
        oSession.utilCreateResponseAndBypassServer();
        oSession.oResponse.headers.SetStatus(statusCode, "By Fiddler");
        if(contentType==null)
            contentType="text/html";
        contentType=contentType+"; charset=utf-8";
        oSession.oResponse["Content-Type"] = contentType;
        oSession.oResponse["Date"] = DateTime.Now.ToUniversalTime().ToString("r");
        oSession.utilSetResponseBody(body);
    }    
    
    public static RulesOption("启用自定义规则", "自定义规则")
    var m_EnableCustomRule: boolean = true;
    
    /** 隐藏不相关请求（如css、image等） **/
    public static RulesOption("隐藏CSS/image等请求", "自定义规则")
    var m_HideOtherRequest: boolean = false;
    
    public static RulesOption("强制关闭缓存", "自定义规则")
    var m_DisableCache: boolean = false;       
        
    public static RulesOption("隐藏URL黑名单的请求", "自定义规则")
    var m_HideByUrlBacklist: boolean = true;
            
    public static RulesOption("仅接受IP白名单的请求", "自定义规则")
    var m_DenyWithoutIpWhitelist: boolean = false;            
      
    public static RulesOption("隐藏所有来源请求")
    var m_HideAllRequest: boolean = false;

    static function MapUrlToFilePath(url: String, rootUrl: String, rootDir: String) {
        var idx = url.indexOf(rootUrl);
        if(idx < 0)
            throw new Error("参数错误：" + rootUrl);
        var idxArgs = url.indexOf("?");
        var relatPath = url.substring(idx + rootUrl.length, idxArgs > 0 ? idxArgs: undefined);
        relatPath = relatPath.replace("/", "\\");
        var pSp = relatPath[0] == "\\" ? "" : "\\";
        return rootDir + pSp + relatPath;
    }
    /************************* custom rules *************************/
    /**
    * 按目录替换
    *
    * @param oSession {Session} Fiddler Session Object
    * @param domain {String} 需要替换的为本地文件的URL前缀(以斜杠结束)
    * @param folder {String} 本地文件目录的物理路径(两个反斜杠表示一个反斜杠，以反斜杠结束)
    */
    public static function AutoResponseFolder ( oSession: Session, domain:String, folder:String ) {       
        // 获取当前对话的完整URL
        var fullUrl:String = oSession. fullUrl ;
        if ( fullUrl. StartsWith ( domain ) ) {
            var localPath:String = fullUrl. replace (domain, folder ) ;
            //去掉链接后的参数
       
            var idxArgs = localPath.indexOf("?");
            var relatPath = localPath.substring(0, idxArgs > 0 ? idxArgs: localPath.length);
       
            //set back color
            oSession [ 'ui-backcolor' ] = 'yellow' ;
       
            //set delay
            //oSession['response-trickle-delay'] = 2000;
       
            //replace server file
            oSession [ 'x-replywithfile' ] = relatPath;
       
            //write log
            //FiddlerObject.log(localPath);
 
        }
    }
 
/**
* 单文件替换
*
* @param oSession {Session} Fiddler Session Object
* @param found {String} 需要替换的URL包含的关键字
* @param replacement {String} 本地文件目录的物理路径(两个反斜杠表示一个反斜杠)
*/
    public static function AutoResponse ( oSession: Session, found:String, replacement:String ) {   
        if ( oSession. uriContains ( found ) ) {
            //set back color
            oSession [ 'ui-backcolor' ] = 'lightgreen' ;
       
            //set color
            oSession [ 'ui-color' ] = 'black' ;
       
            //replace server file
            oSession [ 'x-replywithfile' ] = replacement;
       
            //write log
            //FiddlerObject.log(localPath);
        }
    }
 
/**
* 添加一个自定义的规则，
* 映射单个文件：AutoResponse 
* 映射目录：AutoResponseFolder
*/
    public  static function AddRules ( oSession: Session ) {
        // 路径和替换规则根据各项目实际情况替换
        var folderJS:String = 'E:\\gulp\\wallet2.2\\src\\js\\' ;
        var domainJS:String = 'https://static.pay1pay.com/js/mideaHome/wallet/' ;
        var folderCSS:String = 'E:\\gulp\\wallet2.2\\src\\css\\' ;
        var domainCSS:String = 'https://static.pay1pay.com/css/mideaHome/wallet/' ;
        var folderIMG:String = 'E:\\gulp\\wallet2.2\\src\\img\\' ;
        var domainIMG:String = 'https://static.pay1pay.com/img/mideaHome/wallet/' ;
    
   
       // AutoResponse ( oSession, 'https://static.pay1pay.com/js/mideaHome/wallet/test.js', 'https:/test.com/test.js' ) ;
        //AutoResponse ( oSession, 'https://static.pay1pay.com/js/mideaHome/wallet/test.js' , 'E:\\gulp\\wallet2.2\\src\\js\\test.js' ) ;
   
        // 需要替换的为本地文件的URL前缀(以斜杠结束)
    
        // 本地文件目录的物理路径(两个反斜杠表示一个反斜杠，以反斜杠结束)
    
        AutoResponseFolder ( oSession, domainJS, folderJS ) ;
        AutoResponseFolder ( oSession, domainCSS, folderCSS ) ;
        AutoResponseFolder ( oSession, domainIMG, folderIMG ) ;
    }      
            
}
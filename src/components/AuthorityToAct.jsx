import React, { useEffect, useState, useRef } from "react";
import Logo2 from "../Assets/Ukimmigration-logo.png";
import bellicon2 from "../Assets/bell-icon-svg.svg";
import profileimg from "../Assets/profile-img-svg.svg";
import dropdownicon from "../Assets/dropdown-icon-svg.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NotificationBox from "./Notification";
import SettingBox from "./Settingbox";
import "../style/GroupAgreement.css";
import Navbar from "./Navbar";
import { toastError } from "./Toast";
import { useGetGroupClientAppByUserIdQuery } from "../services/api/companyClient";

const AuthorityToAct = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState();
  const {data} = useGetGroupClientAppByUserIdQuery();
  console.log(data);

  const [activeLink, setActiveLink] = useState("/authoritytoact");
  console.log(activeLink);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleNext = () => {
    if (!checked) {
      toastError("Please Agree to our Terms and Conditions");
      return;
    }
    const app = data?.application?.phase2;
    navigate(
         app?.isAllowAccessToFile
        ? "/authoritytoallow"
        : app?.isShareClientDetails
        ? "/authoritytoshare"
        : "/group/phase2"
    );
  };

  return (
    <div className="Container-forgetpassword-phase1">
      <Navbar />
      <div className="Forgetpassword-sub-2">
        <p className="confirmation-text-2-group">Terms*</p>

        <div className="Agreement-All">
          {data?.application?.phase2?.isTerms && (
            <NavLink
              to={`#`}
              className={`link-hover-effect ${
                activeLink === "/agreement" ? "link-active" : ""
              }`}
              style={{ width: "10rem" }}
            >
              <span>Terms and Conditions</span>
            </NavLink>
          )}

          {data?.application?.phase2?.isAuthority && (
            <NavLink
              to={`#`}
              className={`link-hover-effect ${
                activeLink === "/authoritytoact" ? "link-active" : ""
              }`}
              style={{ width: "7rem" }}
            >
              <span>Authority to Act</span>
            </NavLink>
          )}
          {data?.application?.phase2?.isAllowAccessToFile && (
            <NavLink
              to={`#`}
              className={`link-hover-effect ${
                activeLink === "/authoritytoallow" ? "link-active" : ""
              }`}
              style={{ width: "8rem" }}
            >
              <span>Authority to Allow</span>
            </NavLink>
          )}
          {data?.application?.phase2?.isShareClientDetails && (
            <NavLink
              to={`#`}
              className={`link-hover-effect ${
                activeLink === "/authoritytoshare" ? "link-active" : ""
              }`}
              style={{ width: "8.7rem" }}
            >
              <span>Authority to Share</span>
            </NavLink>
          )}
        </div>
        <div className="Agreement-description">
          1. YOUR AGREEMENT By using this Site, you agree to be bound by, and to
          comply with, these Terms and Conditions. If you do not agree to these
          Terms and Conditions, please do not use this site. PLEASE NOTE: We
          reserve the right, at our sole discretion, to change, modify or
          otherwise alter these Terms and Conditions at any time. Unless
          otherwise indicated, amendments will become effective immediately.
          Please review these Terms and Conditions periodically. Your continued
          use of the Site following the posting of changes and/or modifications
          will constitute your acceptance of the revised Terms and Conditions
          and the reasonableness of these standards for notice of changes. For
          your information, this page was last updated as of the date at the top
          of these terms and conditions. 2. PRIVACY Please review our Privacy
          Policy, which also governs your visit to this Site, to understand our
          practices. 3. LINKED SITES This Site may contain links to other
          independent third-party Web sites ("Linked Sites”). These Linked Sites
          are provided solely as a convenience to our visitors. Such Linked
          Sites are not under our control, and we are not responsible for and
          does not endorse the content of such Linked Sites, including any
          information or materials contained on such Linked Sites. You will need
          to make your own independent judgment regarding your interaction with
          these Linked Sites. 4. FORWARD LOOKING STATEMENTS All materials
          reproduced on this site speak as of the original date of publication
          or filing. The fact that a document is available on this site does not
          mean that the information contained in such document has not been
          modified or superseded by events or by a subsequent document or
          filing. We have no duty or policy to update any information or
          statements contained on this site and, therefore, such information or
          statements should not be relied upon as being current as of the date
          you access this site. 6. EXCLUSIONS AND LIMITATIONS SOME JURISDICTIONS
          DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR
          EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES.
          ACCORDINGLY, OUR LIABILITY IN SUCH JURISDICTION SHALL BE LIMITED TO
          THE MAXIMUM EXTENT PERMITTED BY LAW. 7. OUR PROPRIETARY RIGHTS This
          Site and all its Contents are intended solely for personal,
          non-commercial use. Except as expressly provided, nothing within the
          Site shall be construed as conferring any license under our or any
          third party's intellectual property rights, whether by estoppel,
          implication, waiver, or otherwise. Without limiting the generality of
          the foregoing, you acknowledge and agree that all content available
          through and used to operate the Site and its services is protected by
          copyright, trademark, patent, or other proprietary rights. You agree
          not to: (a) modify, alter, or deface any of the trademarks, service
          marks, trade dress (collectively "Trademarks") or other intellectual
          property made available by us in connection with the Site; (b) hold
          yourself out as in any way sponsored by, affiliated with, or endorsed
          by us, or any of our affiliates or service providers; (c) use any of
          the Trademarks or other content accessible through the Site for any
          purpose other than the purpose for which we have made it available to
          you; (d) defame or disparage us, our Trademarks, or any aspect of the
          Site; and (e) adapt, translate, modify, decompile, disassemble, or
          reverse engineer the Site or any software or programs used in
          connection with it or its products and services. The framing,
          mirroring, scraping or data mining of the Site or any of its content
          in any form and by any method is expressly prohibited. 8. INDEMNITY By
          using the Site web sites you agree to indemnify us and affiliated
          entities (collectively "Indemnities") and hold them harmless from any
          and all claims and expenses, including (without limitation) attorney's
          fees, arising from your use of the Site web sites, your use of the
          Products and Services, or your submission of ideas and/or related
          materials to us or from any person's use of any ID, membership or
          password you maintain with any portion of the Site, regardless of
          whether such use is authorized by you. 9. COPYRIGHT AND TRADEMARK
          NOTICE Except our generated dummy copy, which is free to use for
          private and commercial use, all other text is copyrighted.
          generator.lorem-ipsum.info © 2013, all rights reserved 10.
          INTELLECTUAL PROPERTY INFRINGEMENT CLAIMS It is our policy to respond
          expeditiously to claims of intellectual property infringement. We will
          promptly process and investigate notices of alleged infringement and
          will take appropriate actions under the Digital Millennium Copyright
          Act ("DMCA") and other applicable intellectual property laws. Notices
          of claimed infringement should be directed to:
          generator.lorem-ipsum.info 126 Electricov St. Kiev, Kiev 04176 Ukraine
          contact@lorem-ipsum.info 11. PLACE OF PERFORMANCE This Site is
          controlled, operated and administered by us from our office in Kiev,
          Ukraine. We make no representation that materials at this site are
          appropriate or available for use at other locations outside of the
          Ukraine and access to them from territories where their contents are
          illegal is prohibited. If you access this Site from a location outside
          of the Ukraine, you are responsible for compliance with all local
          laws. 12. GENERAL A. If any provision of these Terms and Conditions is
          held to be invalid or unenforceable, the provision shall be removed
          (or interpreted, if possible, in a manner as to be enforceable), and
          the remaining provisions shall be enforced. Headings are for reference
          purposes only and in no way define, limit, construe or describe the
          scope or extent of such section. Our failure to act with respect to a
          breach by you or others does not waive our right to act with respect
          to subsequent or similar breaches. These Terms and Conditions set
          forth the entire understanding and agreement between us with respect
          to the subject matter contained herein and supersede any other
          agreement, proposals and communications, written or oral, between our
          representatives and you with respect to the subject matter hereof,
          including any terms and conditions on any of customer's documents or
          purchase orders.
        </div>
        <div className="checkbox-2">
          <p className="ist-check">
            <input
              required
              className="main-box"
              type="checkbox"
              onChange={(e) => {
                const value = e.target.checked ? true : false;
                setChecked(value);
              }}
            />
            I have read and agree to the terms of service{" "}
          </p>
        </div>

        <button type="button" onClick={handleNext} className="submit-agreement">
          Next
        </button>
      </div>
    </div>
  );
};

export default AuthorityToAct;

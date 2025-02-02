import CardTitle from "@dashboard/components/CardTitle";
import FormSpacer from "@dashboard/components/FormSpacer";
import { Locale, localeNames } from "@dashboard/components/Locale";
import SingleAutocompleteSelectField from "@dashboard/components/SingleAutocompleteSelectField";
import { capitalize } from "@dashboard/misc";
import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface StaffPreferencesProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const StaffPreferences: React.FC<StaffPreferencesProps> = ({
  locale,
  onLocaleChange,
}) => {
  const intl = useIntl();

  const handleLocaleChange = async (locale: Locale) => {
    await onLocaleChange(locale);

    /*
      Workaround, after changing language we reload the page.
      saleor-sdk causes the error related to wrong cache management.
      Migration to auth-sdk can solve it.
      Ref: https://github.com/saleor/saleor-dashboard/issues/4340
    */
    window.location.reload();
  };

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          id: "CLeDae",
          defaultMessage: "Preferences",
          description: "section header",
        })}
      />
      <CardContent>
        <SingleAutocompleteSelectField
          choices={Object.values(Locale).map(locale => ({
            label: capitalize(localeNames[locale].displayName),
            value: locale,
          }))}
          displayValue={localeNames[locale].displayName}
          helperText={intl.formatMessage({
            id: "JJgJwi",
            defaultMessage:
              "Selecting this will change the language of your dashboard",
          })}
          label={intl.formatMessage({
            id: "mr9jbO",
            defaultMessage: "Preferred Language",
          })}
          name="locale"
          value={locale}
          onChange={event => handleLocaleChange(event.target.value)}
        />
        <FormSpacer />
        <Typography>
          <FormattedMessage
            id="e822us"
            defaultMessage="Please note, while all currency and date adjustments are complete, language translations are at varying degrees of completion."
          />
        </Typography>
      </CardContent>
    </Card>
  );
};
StaffPreferences.displayName = "StaffPreferences";
export default StaffPreferences;
